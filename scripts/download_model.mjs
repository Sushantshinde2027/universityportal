// Downloads the ONNX build of all-MiniLM-L6-v2 (the same embedding model
// used by the reference bot) into models/ so the pipeline and the Vercel
// function can run completely offline.

import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const MODEL_ID = "Xenova/all-MiniLM-L6-v2";
export const MODEL_DIR = resolve(ROOT, "models", MODEL_ID);

// The local folder mirrors the layout of the Hugging Face repo, including
// the onnx/ subfolder where the runtime looks for the weights.
const FILES = [
    "config.json",
    "tokenizer.json",
    "tokenizer_config.json",
    "special_tokens_map.json",
    "vocab.txt",
    "onnx/model_quantized.onnx",
];

const BASE = `https://huggingface.co/${MODEL_ID}/resolve/main`;


async function download() {

    mkdirSync(MODEL_DIR, { recursive: true });

    for (const file of FILES) {

        const url = `${BASE}/${file}`;
        const target = resolve(MODEL_DIR, file);

        console.log(`Downloading ${file}...`);

        mkdirSync(dirname(target), { recursive: true });

        const response = await fetch(url, { redirect: "follow" });

        if (!response.ok) {
            throw new Error(`Failed to download ${url}: ${response.status}`);
        }

        await pipeline(Readable.fromWeb(response.body), createWriteStream(target));
    }

    console.log(`\nModel saved to: ${MODEL_DIR}`);
}


if (process.argv[1] === fileURLToPath(import.meta.url)) {

    console.log("=".repeat(55));
    console.log("   ADCET - EMBEDDING MODEL DOWNLOAD");
    console.log("=".repeat(55));

    await download();

    console.log("\nStatus: MODEL DOWNLOAD COMPLETE");
    console.log("=".repeat(55));
}
