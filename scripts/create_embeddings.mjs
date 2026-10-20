import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { env, pipeline } from "@huggingface/transformers";

import { MODEL_ID, MODEL_DIR } from "./download_model.mjs";


const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_FILE = resolve(ROOT, "data/chunks.json");
const OUTPUT_FILE = resolve(ROOT, "data/embeddings.json");


console.log("=".repeat(60));
console.log("   ADCET - EMBEDDING GENERATION");
console.log("=".repeat(60));


// ----------------------------------------
// LOAD THE MODEL FROM models/ (OFFLINE)
// ----------------------------------------

if (!existsSync(MODEL_DIR)) {
    console.log("\nModel files not found. Run: npm run model");
    process.exit(1);
}

env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = resolve(ROOT, "models") + sep;


// ----------------------------------------
// LOAD CHUNKS
// ----------------------------------------

console.log("\nLoading chunks...");

const chunks = JSON.parse(readFileSync(INPUT_FILE, "utf-8"));

console.log(`Chunks loaded: ${chunks.length}`);


// ----------------------------------------
// LOAD EMBEDDING MODEL
// ----------------------------------------

console.log("\nLoading embedding model...");

const model = await pipeline("feature-extraction", MODEL_ID, {
    dtype: "q8",
    device: "cpu",
});

console.log("Embedding model loaded successfully.");


// ----------------------------------------
// GENERATE EMBEDDINGS
// ----------------------------------------

console.log("\nGenerating embeddings...");

const embeddingData = [];

for (const [index, chunk] of chunks.entries()) {

    const output = await model(chunk.content, { pooling: "mean", normalize: true });
    const embedding = Array.from(output.data);

    embeddingData.push({
        chunk_id: chunk.chunk_id,
        title: chunk.title,
        content: chunk.content,
        source: chunk.source,
        embedding,
    });

    console.log(`  ${chunk.chunk_id} -> ${chunk.title} (${index + 1}/${chunks.length})`);
}


// ----------------------------------------
// SAVE EMBEDDINGS
// ----------------------------------------

mkdirSync(dirname(OUTPUT_FILE), { recursive: true });

writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(embeddingData),
    "utf-8"
);


// ----------------------------------------
// COMPLETE
// ----------------------------------------

console.log("\n" + "=".repeat(60));
console.log("EMBEDDING GENERATION COMPLETE");
console.log("=".repeat(60));

console.log(`Chunks processed : ${embeddingData.length}`);
console.log(`Dimensions       : ${embeddingData[0].embedding.length}`);
console.log(`Output file      : ${OUTPUT_FILE}`);
console.log(`File size        : ${(readFileSync(OUTPUT_FILE).length / 1024).toFixed(1)} KB`);

console.log("\nStatus: EMBEDDINGS CREATED");
console.log("=".repeat(60));
