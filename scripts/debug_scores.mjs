// Inspects retrieval rankings for a query.
//
//   node scripts/debug_scores.mjs "your query"

import handler from "../api/ask.js";

// Re-implemented locally so we can see the score breakdown.
// api/ask.js exposes the same logic in production.

const questions = process.argv.slice(2).length
    ? process.argv.slice(2)
    : [
        "Where is ADCET located?",
        "What is the highest package in placements?",
        "Who is the HOD of Computer Science?",
        "Tell me about the football team of ADCET",
        "Who is the vice chancellor of Shivaji University?",
        "What is the capital of France?"
    ];


function makeResponse(question) {
    return {
        statusCode: null,
        status(code) { this.statusCode = code; return this; },
        json(payload) {
            console.log(`\nQ: ${question}`);
            console.log("-".repeat(60));
            console.log(`Answer section: ${payload.title}`);
            console.log("Sources:");
            for (const source of payload.sources ?? []) {
                console.log(`  ${source.score.toFixed(4)}  s=${source.semantic} k=${source.keyword} c=${source.category}  ${source.title}`);
            }
            return this;
        }
    };
}


console.log("Retrieval inspection");
console.log("=".repeat(60));

for (const question of questions) {
    const response = makeResponse(question);
    await handler({ method: "POST", body: { question } }, response);
}
