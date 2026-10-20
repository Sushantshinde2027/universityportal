// ============================================================
// ADCET PORTAL - RAG RETRIEVER (NO LLM)
//
// Port of the reference rag_chatbot.py for a serverless
// deployment. The retrieval pipeline is identical:
//
//   hybrid score = semantic x 0.45 + keyword x 0.25 + category x 0.30
//   top 3 chunks, answer taken from the knowledge base itself
//
// Differences from the reference:
//   - embeddings of the portal are precomputed (data/embeddings.json)
//   - the query is embedded in-process with the same model
//     (all-MiniLM-L6-v2, bundled in models/)
//   - there is no LLM: the answer is the best matching knowledge
//     chunk, verbatim from the college knowledge base
// ============================================================

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, sep } from "node:path";

import { env, pipeline } from "@huggingface/transformers";
import embeddings from "../data/embeddings.json" with { type: "json" };


// ============================================================
// FILE PATH
// ============================================================

const MODELS_DIR = resolve(
    fileURLToPath(new URL("../models/", import.meta.url))
);

// Fall back to the working directory when the bundle layout differs
const LOCAL_MODEL_PATH = existsSync(MODELS_DIR)
    ? MODELS_DIR
    : resolve(process.cwd(), "models");

env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = LOCAL_MODEL_PATH + sep;


// ============================================================
// KNOWLEDGE BASE
// ============================================================

const data = embeddings;

const embeddingMatrix = data.map((item) => item.embedding);

const documentEmbeddings = embeddingMatrix.map((vector) => {

    const norm = Math.sqrt(
        vector.reduce((sum, value) => sum + value * value, 0)
    );

    return vector.map((value) => value / norm);
});


// Word arrays of every fact, used to judge how distinctive a
// subject word is (which word says what a question is really
// about, rather than what every section shares).
const dataWordLists = data.map(
    (item) =>
        ((item.title ?? "") + " " + (item.content ?? ""))
            .toLowerCase()
            .match(/[a-z0-9]+/g) || []
);


// Title words of every fact, used to weigh a subject word by
// how often a SECTION TITLE carries it: "admission", "hostel"
// and "placement" name sections, "students" and "number" never
// do, so the first kind identifies what a question is about.
const dataTitleWordLists = data.map(
    (item) =>
        (item.title ?? "").toLowerCase().match(/[a-z0-9]+/g) || []
);


// ============================================================
// EMBEDDING MODEL (LAZY, LOADED ONCE PER COLD START)
// ============================================================

let modelPromise = null;

function getModel() {

    if (!modelPromise) {

        modelPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
            dtype: "q8",
            device: "cpu",
        });
    }

    return modelPromise;
}


// ============================================================
// KEYWORD SEARCH (same as the reference rag_chatbot.py)
// ============================================================

function keywordScore(query, content) {

    const queryWords = new Set(
        (query.toLowerCase().match(/[a-zA-Z0-9]+/g) || [])
    );

    const contentWords = new Set(
        (content.toLowerCase().match(/[a-zA-Z0-9]+/g) || [])
    );

    if (queryWords.size === 0) {
        return 0.0;
    }

    let matched = 0;

    for (const word of queryWords) {
        if (contentWords.has(word)) matched++;
    }

    return matched / queryWords.size;
}


// ============================================================
// CATEGORY DETECTION (college categories, same idea as the
// reference which boosted its clinic sections)
// ============================================================

const CATEGORIES = {

    admission: [
        "admission", "admissions", "apply", "application",
        "cap", "eligibility", "documents", "entrance", "cet"
    ],

    courses: [
        "course", "courses", "program", "programs", "programme",
        "branch", "department", "b.tech", "mtech", "m.tech",
        "bba", "bca", "degree", "intake", "seats"
    ],

    faculty: [
        "faculty", "professor", "hod", "head of department",
        "teacher", "teaching staff", "qualification"
    ],

    placement: [
        "placement", "placements", "package", "recruiter",
        "recruiters", "job", "jobs", "career", "highest package",
        "average package"
    ],

    hostel: [
        "hostel", "hostels", "accommodation", "mess",
        "bus", "transport", "transportation"
    ],

    facilities: [
        "facility", "facilities", "infrastructure", "campus",
        "laboratory", "laboratories", "library", "wifi",
        "internet", "sports", "playground", "atm"
    ],

    contact: [
        "contact", "phone", "mobile", "number", "email",
        "call", "telephone", "enquiry", "inquiry"
    ],

    address: [
        "address", "location", "located", "where", "directions"
    ],

    scholarship: [
        "scholarship", "scholarships", "fee", "fees",
        "loan", "education loan", "stipend", "fellowship"
    ],

    accreditation: [
        "naac", "nba", "aicte", "accredited", "accreditation",
        "autonomous", "affiliated", "approval", "approved",
        "iso", "certification", "certificate"
    ],

    vision: ["vision"],

    mission: ["mission"],

    notices: [
        "notice", "notices", "announcement", "announcements",
        "circular", "news", "update", "latest"
    ],

    leadership: [
        "director", "founder", "secretary", "principal",
        "chairman", "management", "leader"
    ],

    eligibility: ["eligible", "eligibility", "criteria"]
};


// Section titles that answer each category
const CATEGORY_TITLES = {

    admission: [
        "admission information",
        "admission eligibility",
        "required documents"
    ],

    courses: [
        "btech programs",
        "mtech programs",
        "other undergraduate programs"
    ],

    faculty: ["faculty of "],

    placement: ["placements"],

    hostel: ["hostel and transport"],

    facilities: ["campus facilities", "hostel and transport"],

    contact: ["contact information"],

    address: ["address"],

    scholarship: ["scholarships and loans"],

    accreditation: ["accreditation and approvals"],

    vision: ["vision"],

    mission: ["mission"],

    notices: ["latest notices"],

    leadership: ["leadership"]
};


// Matches a keyword as a whole word, so that "cap" does not hit
// inside "capital" and "fee" does not hit inside "feel".
function containsTerm(text, term) {

    if (term.includes(" ")) {
        return text.includes(term);
    }

    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    return new RegExp(`\\b${escaped}\\b`).test(text);
}


function categoryScore(query, title) {

    const queryLower = query.toLowerCase();
    const titleLower = title.toLowerCase();

    let best = 0.0;

    for (const [category, keywords] of Object.entries(CATEGORIES)) {

        if (!keywords.some((word) => containsTerm(queryLower, word))) {
            continue;
        }

        const titles = CATEGORY_TITLES[category] || [];

        if (titles.some((section) => titleLower.includes(section))) {
            best = Math.max(best, 1.5);
        }
    }

    return best;
}


// ============================================================
// INFORMATIVE KEYWORD MATCH
// (used to notice questions that are not about the college at
//  all, which the reference bot handled by asking its LLM)
// ============================================================

const STOP_WORDS = new Set([
    "a", "an", "the", "is", "are", "was", "were", "be", "been",
    "to", "of", "in", "on", "for", "and", "or", "but", "as",
    "at", "by", "from", "with", "that", "this", "these", "those",
    "it", "its", "i", "me", "my", "we", "our", "you", "your",
    "who", "what", "when", "where", "why", "how", "which",
    "does", "did", "do", "has", "have", "had", "can", "could",
    "should", "would", "will", "shall", "may", "might",
    "tell", "about", "please", "there", "much", "many", "more",
    "adcet", "college", "institute"
]);


// Ordinary wording, not official wording: questions say
// "courses / branches / departments" where the site says
// "programs / departments". Expanding a few of these lets a
// plain question line up with a section title without making
// the match loose.
const SYNONYMS = new Map([
    ["course", "program"],
    ["courses", "program"],
    ["branch", "program"],
    ["branches", "program"],
    ["program", "program"],
    ["programs", "program"],
    ["stream", "program"],
    ["streams", "program"],
    ["stream", "program"],
    ["department", "department"],
    ["departments", "department"]
]);

function synonymOf(word) {

    const direct = SYNONYMS.get(word);

    if (direct) return direct;

    for (const [key, value] of SYNONYMS) {

        if (sameWord(word, key)) return value;
    }

    return word;
}


function informativeWords(query) {

    return (query.toLowerCase().match(/[a-z0-9.]+/g) || [])
        .map((word) => word.replace(/\./g, ""))
        .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
}


// Cheap stemmer: "facilities"/"facility", "students"/"student"
// and "courses"/"course" count as the same subject word.
function sameWord(a, b) {

    if (a === b) return true;

    if (a.length < 4 || b.length < 4) return false;

    return a.slice(0, 4) === b.slice(0, 4);
}


function informativeMatchScore(query, item, source = "both") {

    const words = informativeWords(query);

    if (words.length === 0) return 0;

    // The gate looks at title + content: a section title is
    // legitimate evidence that the subject exists. Selecting
    // answer lines looks at the fact's own words only, so an
    // unrelated fact never matches just because its SECTION
    // happens to be called "Data Science".
    const haystackSource =
        source === "content" ? item.content : item.title + " " + item.content;

    const haystackWords = (haystackSource.toLowerCase().match(/[a-z0-9]+/g) || [])
        .filter((word) => !STOP_WORDS.has(word));

    const matched = words.filter((word) =>
        haystackWords.some((hay) => sameWord(word, hay))
    );

    return matched.length / words.length;
}


// How much of the question's subject the SECTION TITLE itself
// covers. A section whose title carries the subject words
// ("FACULTY OF COMPUTER SCIENCE...") speaks for the question
// and may answer it loosely; other sections must match almost
// completely, so an AI & Data Science professor never answers
// a Computer Science question just because her expertise
// mentions both fields. The title has to cover well over half
// of the subject, so "data science" scoring on "science" alone
// is not enough to claim a "computer science" question.
function titleCoverage(query, title) {

    const words = informativeWords(query);

    if (words.length === 0) return 0;

    const titleWords = (title.toLowerCase().match(/[a-z0-9]+/g) || [])
        .map(synonymOf);

    const matched = words.filter((word) =>
        titleWords.some((titleWord) => sameWord(synonymOf(word), titleWord))
    );

    const coverage = matched.length / words.length;

    // Full marks when the title wins by being the best of the
    // available sections, not merely by reaching a ratio: one
    // of three words can clear "half" on a short question while
    // another section is strictly better. Judged by the caller.
    return coverage;
}


// Whether this section title is a good enough claim on the
// question, relative to the best title in the candidate set.
function isTitleAnchor(query, title, bestTitleCoverage) {

    const coverage = titleCoverage(query, title);

    if (coverage < 0.5) return false;

    return coverage >= bestTitleCoverage - 0.05;
}


// ============================================================
// HYBRID RETRIEVER
// ============================================================

// The college's own name appears in nearly every fact, so it
// drowns the actual question in the embedding. Strip it before
// embedding; keyword and category scoring still use the full
// query.
function queryMeaning(query) {

    const stripped = query
        .replace(/\b(adcet|annasaheb\s+dange|dange)\b/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    return stripped.length >= 2 ? stripped : query;
}


async function retrieve(query, topK = 3) {

    // --------------------------------------------------------
    // Semantic similarity (same model as the reference)
    // --------------------------------------------------------

    const model = await getModel();

    const output = await model(queryMeaning(query), { pooling: "mean", normalize: true });

    const queryEmbedding = Array.from(output.data);

    const norm = Math.sqrt(
        queryEmbedding.reduce((sum, value) => sum + value * value, 0)
    );

    const normalizedQuery = queryEmbedding.map((value) => value / norm);


    // --------------------------------------------------------
    // Calculate hybrid scores
    // --------------------------------------------------------

    const results = [];

    for (let i = 0; i < data.length; i++) {

        const item = data[i];
        const documentVector = documentEmbeddings[i];

        let semantic = 0;

        for (let d = 0; d < normalizedQuery.length; d++) {
            semantic += normalizedQuery[d] * documentVector[d];
        }

        const keyword = keywordScore(query, `${item.title} ${item.content}`);

        const category = categoryScore(query, item.title);

        const score = semantic * 0.45 + keyword * 0.25 + category * 0.30;

        results.push({
            chunk_id: item.chunk_id,
            section_id: item.section_id,
            title: item.title,
            content: item.content,
            score,
            semantic_score: semantic,
            keyword_score: keyword,
            category_score: category
        });
    }


    // --------------------------------------------------------
    // Sort, then keep the best facts while limiting how many
    // one section may contribute: a question about a whole
    // department needs several kinds of facts (courses,
    // faculty, intake), which usually live in different
    // sections, so no single section may crowd the rest out.
    // --------------------------------------------------------

    results.sort((a, b) => b.score - a.score);

    const perSection = new Map();

    const picked = [];

    for (const result of results) {

        const count = perSection.get(result.title) ?? 0;

        if (count >= 4) continue;

        perSection.set(result.title, count + 1);

        picked.push(result);

        if (picked.length >= topK) break;
    }

    return picked;
}


// ============================================================
// ANSWER BUILDING
//
// Same structure as the reference rag_chatbot.py:
//   retrieve -> grounded prompt -> LLM writes the answer.
// The reference uses Ollama (llama3.2) locally; on Vercel a
// free public endpoint is used instead, so there is still no
// API key to manage. If the endpoint cannot be reached, the
// best matching knowledge facts are returned directly.
// ============================================================

const NOT_FOUND_ANSWER =
    "I don't have that information in the college knowledge base.";


// -------------------------------------------------------------
// Relevance gate: refuse honestly when the knowledge base has
// nothing on the subject at all. Checked against every returned
// fact, not just the best one, so broad questions ("tell me
// about the computer science department", "which departments
// are offered") still get through whenever any matching fact
// exists, while greetings, jokes and unrelated questions are
// refused without spending an LLM call.
//
// Whether the subject is genuinely answerable (HOD of a
// department that is not listed, fees that are not recorded)
// is then decided by the grounded answer itself - the same way
// the reference bot's prompt rule 3 does it.
// -------------------------------------------------------------

function isRelevant(question, results) {

    return results.some(
        (result) =>
            informativeMatchScore(question, result) >= 0.5 ||
            result.semantic_score >= 0.68
    );
}


// -------------------------------------------------------------
// Fallback answer (used when no LLM engine is reachable):
// the strongly matching knowledge facts, quoted directly, so a
// department question can still list its courses and faculty.
// Stricter than the LLM: when unsure, quote nothing rather
// than quote the wrong fact.
// -------------------------------------------------------------

function extractiveAnswer(results, question) {

    const best = results[0];

    if (!best) return NOT_FOUND_ANSWER;

    // When some section title speaks for the subject (a
    // "...COMPUTER SCIENCE..." section for a computer science
    // question), only facts from such sections may answer -
    // other sections' facts must be very close in meaning
    // instead, so an AI & Data Science professor never answers
    // a Computer Science question just because her expertise
    // mentions both fields. When no title covers the subject
    // ("students", "facilities"), strong subject-word matches
    // anywhere qualify. The bar is deliberately strict: when
    // answering without an LLM, quoting nothing beats quoting
    // the wrong fact.
    const maxTitleCoverage = Math.max(
        0,
        ...results.map((result) => titleCoverage(question, result.title))
    );

    const anchorMode = maxTitleCoverage >= 0.5;
    const words = informativeWords(question);

    // In word mode a fact must also cover the question's most
    // distinctive subject word - the one that says what the
    // question is really about ("mechanical" for a mechanical
    // department question, "admission" for an admission
    // question), not the "engineering department" tail that
    // every section shares. Distinctive means rare in the
    // facts, or naming one of the section titles. When no such
    // word appears in the knowledge base, word matches stop
    // qualifying altogether, which is how unlisted subjects
    // end up refused.
    const dfOf = (word) =>
        dataWordLists.filter((wordList) =>
            wordList.some((hay) => sameWord(word, hay))
        ).length;

    const titleDf = (word) =>
        dataTitleWordLists.filter((titleWords) =>
            titleWords.some((hay) => sameWord(word, hay))
        ).length;

    let keyWord = null;

    if (!anchorMode && words.length > 0) {

        const generic = (word) =>
            ["engineering", "technology", "science"].some((common) =>
                sameWord(word, common)
            );

        // Two ways a subject word earns the job: it names a
        // section other than the generic "engineering" (so
        // "admission", "placement", "robotics" win), or it is
        // simply the rarest word in the question. A generic
        // department word ("engineering" covers every
        // department) is only used when nothing better exists,
        // because on its own it cannot tell mechanical from
        // computer science. Words the best fact does not even
        // contain are avoided when an alternative exists, so
        // "highest package in placements" keys on "package"
        // (which the answer line says) instead of "placements"
        // (which only its section title says).
        const titled = words.filter(
            (word) => titleDf(word) > 0 && !generic(word)
        );

        const bestContentWords =
            (best.content.toLowerCase().match(/[a-z0-9]+/g) || []);

        const inBestContent = (word) =>
            bestContentWords.some((hay) => sameWord(word, hay));

        const choose = (candidates) => {

            const inBest = candidates.filter(inBestContent);

            // Prefer a word the best fact actually says. If the
            // section-naming words do not appear in it (a
            // "placements" question answered by a line saying
            // "package"), the other subject words are considered
            // before giving up on that preference.
            let pool = inBest;

            if (pool.length === 0 && candidates !== words) {
                pool = words.filter(inBestContent);
            }

            if (pool.length === 0) pool = candidates;

            return pool.reduce((bestWord, word) =>
                dfOf(word) < dfOf(bestWord) ? word : bestWord
            );
        };

        if (titled.length > 0) {

            keyWord = choose(titled);

        } else {

            keyWord = choose(words);
        }
    }

    if (process.env.DEBUG_FACTS) {

        console.error(
            "fallback decision:",
            JSON.stringify(
                {
                    anchorMode,
                    maxTitleCoverage,
                    keyWord,
                    candidates: results.map((result) => ({
                        section: result.title,
                        words: Number(
                            informativeMatchScore(
                                question,
                                result,
                                "content"
                            ).toFixed(2)
                        ),
                        title: Number(
                            titleCoverage(question, result.title).toFixed(2)
                        ),
                        sem: Number(result.semantic_score.toFixed(3)),
                        score: Number(result.score.toFixed(3)),
                        content: result.content.slice(0, 60)
                    }))
                },
                null,
                1
            )
        );
    }

    const lines = results

        .filter((result) => {

            if (result.semantic_score >= 0.72) return true;

            const contentMatch = informativeMatchScore(
                question,
                result,
                "content"
            );

            if (anchorMode) {

                // A fact qualifies when its own text carries at
                // least half of the subject words and its section
                // title is one of the sections that speak for
                // the question. That keeps an AI & Data Science
                // professor out of a Computer Science answer
                // while still letting a course listing through.
                return (
                    isTitleAnchor(question, result.title, maxTitleCoverage) &&
                    contentMatch >= 0.5
                );
            }

            if (contentMatch < 0.5 || !keyWord) return false;

            const contentWords =
                result.content.toLowerCase().match(/[a-z0-9]+/g) || [];

            if (!contentWords.some((hay) => sameWord(keyWord, hay))) {
                return false;
            }

            // The key word alone is weak on generic lines ("The
            // ... department has N faculty members" shares
            // "department" with every department question), so
            // the fact must also carry a good share of the
            // subject words and stand close to the best match.
            return (
                contentMatch >= 0.66 &&
                result.score >= best.score * 0.70
            );
        })

        .map((result) => result.content)

        .filter((content, index, all) => all.indexOf(content) === index)

        .slice(0, 6);

    if (lines.length === 0) {
        return NOT_FOUND_ANSWER;
    }

    return lines.join("\n");
}


// -------------------------------------------------------------
// Grounded answer (mirrors the reference prompt rules), built
// once per question and sent to the first engine that answers.
// -------------------------------------------------------------

function buildGroundedPrompt(question, results) {

    const context = results

        .map((result) => `[${result.title}]\n${result.content}`)

        .join("\n\n");

    return `
You are the AI assistant for Annasaheb Dange College of Engineering and
Technology (ADCET), Ashta.

Answer the user's question using ONLY the information provided
in the context below.

IMPORTANT RULES:

1. Do not invent information.
2. Do not guess fees, dates, rankings, cutoffs or any number that is
   not in the context.
3. If the answer is not available in the context, clearly say:
   "I don't have that information in the college knowledge base."
4. Give a direct and concise answer.
5. When the question covers several facts (for example a whole
   department, its faculty, courses or facilities), combine the
   relevant facts from the context into one complete answer.
6. Every fact is labelled with its [SECTION]. Attribute each
   fact only to its own section: a course, faculty member or
   number listed under one department must never be presented
   as belonging to another department, even when the two are
   similar or related. Leave unrelated sections out entirely.
7. Keep the tone helpful and simple, like a college information desk.
8. Do not mention "chunks", "embeddings", "retrieval" or RAG.
9. Answer only about ADCET from the context. If the question is not
   about ADCET, say rule 3's sentence.

CONTEXT:
${context}

USER QUESTION:
${question}

ANSWER:
`;
}


// -------------------------------------------------------------
// Engine 1: Google Gemini free tier, when a key is configured.
// -------------------------------------------------------------

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_TIMEOUT_MS = 12000;

async function callGemini(prompt) {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

    try {

        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/" +
                `${GEMINI_MODEL}:generateContent`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 600,
                        thinkingConfig: { thinkingBudget: 0 }
                    }
                }),
                signal: controller.signal
            }
        );

        if (!res.ok) {
            throw new Error(`gemini returned ${res.status}`);
        }

        const data = await res.json();

        const text = (data?.candidates?.[0]?.content?.parts ?? [])
            .map((part) => part.text ?? "")
            .join("")
            .trim();

        if (!text) {
            throw new Error("gemini returned an empty answer");
        }

        return text;

    } finally {

        clearTimeout(timer);
    }
}


// -------------------------------------------------------------
// Engine 2: public keyless endpoint - the reference's local
// Ollama, hosted. The free tier allows about one request per
// interval, so a rate limit falls through to the facts
// instead of failing the question.
// -------------------------------------------------------------

const LLM_ENDPOINT = "https://text.pollinations.ai/openai";
const LLM_MODEL = "openai";
const LLM_TIMEOUT_MS = 12000;

async function callPollinations(prompt) {

    let lastError;

    for (let attempt = 1; attempt <= 2; attempt += 1) {

        const controller = new AbortController();

        const timer = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

        try {

            const res = await fetch(LLM_ENDPOINT, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    model: LLM_MODEL,
                    temperature: 0.2,
                    messages: [{ role: "user", content: prompt }]
                }),
                signal: controller.signal
            });

            if (!res.ok) {

                // The public endpoint occasionally rate limits.
                // One short pause and one retry absorbs it; any
                // other status fails straight to the fallback.
                const retryable = [402, 429, 500, 502, 503].includes(res.status);

                if (retryable && attempt === 1) {

                    lastError = new Error(`llm endpoint returned ${res.status}`);

                    await new Promise((resolve) => setTimeout(resolve, 1200));

                    continue;
                }

                throw new Error(`llm endpoint returned ${res.status}`);
            }

            const data = await res.json();

            const text = data?.choices?.[0]?.message?.content?.trim();

            if (!text) {
                throw new Error("llm endpoint returned an empty answer");
            }

            return text;

        } catch (error) {

            lastError = error;

            // A timeout already spent the full budget - fall back
            // to the facts instead of waiting a second time. Only
            // fast failures (network refused/reset) are retried.
            const fastFailure =
                attempt === 1 && error?.name === "TypeError";

            if (!fastFailure) throw error;

            await new Promise((resolve) => setTimeout(resolve, 1200));

        } finally {

            clearTimeout(timer);
        }
    }

    throw lastError;
}


// ============================================================
// SERVERLESS HANDLER
// ============================================================

export default async function handler(request, response) {

    if (request.method !== "POST") {

        return response.status(405).json({
            error: "Method not allowed. Use POST with { \"question\": \"...\" }."
        });
    }

    const question = String(request.body?.question ?? "").trim();

    if (!question) {

        return response.status(400).json({
            answer: "Please enter a question."
        });
    }

    try {

        // ----------------------------------------------------
        // Retrieve (top facts feed the answer, like the
        // reference's top_k chunks)
        // ----------------------------------------------------

        const results = await retrieve(question, 16);

        // ----------------------------------------------------
        // Nothing relevant in the knowledge base: refuse
        // honestly, exactly like the reference prompt rule.
        // ----------------------------------------------------

        if (!isRelevant(question, results)) {

            return response.status(200).json({
                answer: NOT_FOUND_ANSWER,
                title: results[0]?.title ?? null,
                chunk_id: results[0]?.chunk_id ?? null,
                sources: []
            });
        }

        // ----------------------------------------------------
        // Grounded answer. Engines are tried in order and any
        // failure falls through, so a question never errors
        // out just because one provider is unavailable.
        // ----------------------------------------------------

        const prompt = buildGroundedPrompt(question, results);

        let answer = null;
        let engine = null;

        // 1. Gemini (free tier key, when configured)
        if (process.env.GEMINI_API_KEY && !process.env.FACTS_ONLY) {

            try {

                answer = await callGemini(prompt);
                engine = "gemini";

            } catch (geminiError) {

                console.error("gemini answer failed:", geminiError);
            }
        }

        // 2. Public keyless endpoint
        if (!answer && !process.env.FACTS_ONLY) {

            try {

                answer = await callPollinations(prompt);
                engine = "llm";

            } catch (llmError) {

                console.error("llm answer failed, using facts:", llmError);
            }
        }

        // 3. Quote the matching knowledge facts
        if (!answer) {

            answer = extractiveAnswer(results, question);
            engine = "facts";
        }

        return response.status(200).json({
            answer,
            engine,
            title: results[0]?.title ?? null,
            chunk_id: results[0]?.chunk_id ?? null,
            sources: results.map((result) => ({
                chunk_id: result.chunk_id,
                title: result.title,
                score: Number(result.score.toFixed(4)),
                semantic: Number(result.semantic_score.toFixed(4)),
                keyword: Number(result.keyword_score.toFixed(4)),
                category: Number(result.category_score.toFixed(4))
            }))
        });

    } catch (error) {

        console.error("ask handler failed:", error);

        return response.status(500).json({
            answer: "Sorry, the assistant is temporarily unavailable. Please try again later."
        });
    }
}
