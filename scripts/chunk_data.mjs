import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_FILE = resolve(ROOT, "data/cleaned_content.txt");
const OUTPUT_FILE = resolve(ROOT, "data/chunks.json");


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


// --------------------------------------------------
// CREATE CHUNKS
// --------------------------------------------------

for (let index = 0; index < sections.length; index++) {

    const section = sections[index].trim();

    if (!section) continue;

    const lines = section.split("\n");

    const title = lines[0].trim();

    const content = lines
        .slice(1)
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n");

    chunks.push({
        chunk_id: `chunk_${String(index + 1).padStart(3, "0")}`,
        title,
        content,
        source: "ADCET College Website",
    });
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

console.log(`\nChunks created: ${chunks.length}`);
console.log(`Output file: ${OUTPUT_FILE}`);

console.log("\nChunk titles:");

for (const chunk of chunks) {
    console.log(`${chunk.chunk_id} -> ${chunk.title}`);
}

console.log("\nStatus: CHUNKING COMPLETE");
console.log("=".repeat(55));
