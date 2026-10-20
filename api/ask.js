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


function informativeWords(query) {

    return (query.toLowerCase().match(/[a-z0-9.]+/g) || [])
        .map((word) => word.replace(/\./g, ""))
        .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
}


function informativeMatchScore(query, item) {

    const words = informativeWords(query);

    if (words.length === 0) return 0;

    // Cheap stemmer: "facilities"/"facility", "students"/"student"
    // and "courses"/"course" count as the same subject word.
    function sameWord(a, b) {

        if (a === b) return true;

        if (a.length < 4 || b.length < 4) return false;

        return a.slice(0, 4) === b.slice(0, 4);
    }

    const haystackWords = (item.title + " " + item.content)
        .toLowerCase()
        .match(/[a-z0-9]+/g) || [];

    const matched = words.filter((word) =>
        haystackWords.some((hay) => sameWord(word, hay))
    );

    return matched.length / words.length;
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
    // Sort
    // --------------------------------------------------------

    results.sort((a, b) => b.score - a.score);

    return results.slice(0, topK);
}


// ============================================================
// BUILD THE ANSWER (extractive - no LLM)
// ============================================================

const NOT_FOUND_ANSWER =
    "I don't have that information in the college knowledge base.";

function generateAnswer(results, question) {

    const best = results[0];

    if (!best) {
        return NOT_FOUND_ANSWER;
    }

    // Relevance gate, applied even when a category matched: the
    // answer must share the question's subject words, or be very
    // close in meaning. A "faculty" question about a department
    // that is not in the knowledge base must get the honest
    // fallback, not whichever faculty fact happens to score best.
    if (
        informativeMatchScore(question, best) < 0.5 &&
        best.semantic_score < 0.68
    ) {
        return NOT_FOUND_ANSWER;
    }

    // Very weak match overall
    if (best.score < 0.30) {
        return NOT_FOUND_ANSWER;
    }

    // The answer is the best matching fact, plus closely scoring
    // facts from the same section when they add to it.
    const lines = [best.content];

    for (const result of results.slice(1)) {

        if (lines.length >= 4) break;

        if (
            result.section_id === best.section_id &&
            result.score >= best.score * 0.80
        ) {
            lines.push(result.content);
        }
    }

    return lines.join("\n");
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
        // Retrieve
        // ----------------------------------------------------

        const results = await retrieve(question, 5);

        // ----------------------------------------------------
        // Answer from the knowledge base
        // ----------------------------------------------------

        const answer = generateAnswer(results, question);

        return response.status(200).json({
            answer,
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
