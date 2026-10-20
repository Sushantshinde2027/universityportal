import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_FILE = resolve(ROOT, "data/cleaned_content.txt");
const OUTPUT_FILE = resolve(ROOT, "data/chunks.json");

// Facts shorter than this are context lines, not answers
const MIN_LINE_LENGTH = 15;


console.log("=".repeat(55));
console.log("       ADCET - TEXT CHUNKING");
console.log("=".repeat(55));


// --------------------------------------------------
// READ CLEANED DATA
// --------------------------------------------------

const text = readFileSync(INPUT_FILE, "utf-8");

console.log(`\nInput characters: ${text.length}`);


// --------------------------------------------------
// SPLIT INTO SECTIONS
// (every ALL-CAPS line starts a new knowledge section,
//  exactly like the reference chunk_data.py)
// --------------------------------------------------

const sections = text.trim().split(/\n(?=[A-Z][A-Z\s]+(?:\n|$))/);

const chunks = [];

let sectionCount = 0;


// --------------------------------------------------
// CREATE CHUNKS
// Each knowledge *line* (one fact, one answer) becomes
// its own chunk, carrying its section title. Without an
// LLM to pick the answer out of a big block, retrieval
// needs the smallest useful unit: a single fact.
// --------------------------------------------------

for (const section of sections) {

    const lines = section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) continue;

    sectionCount++;

    const title = lines[0];
    const body = lines.slice(1);

    let factsInSection = 0;

    for (const line of body) {

        if (line.length < MIN_LINE_LENGTH) continue;

        factsInSection++;

        chunks.push({
            chunk_id: `chunk_${String(chunks.length + 1).padStart(3, "0")}`,
            section_id: `section_${String(sectionCount).padStart(2, "0")}`,
            title,
            content: line,
            source: "ADCET College Website",
        });
    }

    console.log(
        `  section ${String(sectionCount).padStart(2, "0")} ` +
        `-> ${String(factsInSection).padStart(3)} facts  ${title}`
    );
}


// --------------------------------------------------
// SAVE CHUNKS
// --------------------------------------------------

mkdirSync(dirname(OUTPUT_FILE), { recursive: true });

writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(chunks, null, 4),
    "utf-8"
);


// --------------------------------------------------
// DISPLAY RESULTS
// --------------------------------------------------

console.log(`\nSections parsed: ${sectionCount}`);
console.log(`Chunks created  : ${chunks.length}`);
console.log(`Output file     : ${OUTPUT_FILE}`);

console.log("\nStatus: CHUNKING COMPLETE");
console.log("=".repeat(55));
