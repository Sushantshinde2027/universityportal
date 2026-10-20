// End-to-end test of api/ask.js with sample questions.
//
//   node scripts/test_ask.mjs
//   node scripts/test_ask.mjs "your own question"

import handler from "../api/ask.js";


const SAMPLE_QUESTIONS = [

    "Where is ADCET located?",
    "What courses are offered at ADCET?",
    "What is the highest package offered in placements?",
    "Who is the head of the Computer Science department?",
    "Does ADCET provide hostel facilities?",
    "How can I apply for admission?",
    "Is ADCET NAAC accredited?",
    "What is the phone number and email of the college?",
    "Which scholarships are available?",
    "Tell me about the football team of ADCET"
];


const questions = process.argv.slice(2).length
    ? process.argv.slice(2)
    : SAMPLE_QUESTIONS;


function makeResponse() {

    return {
        statusCode: null,

        status(code) {
            this.statusCode = code;
            return this;
        },

        json(payload) {
            console.log(`\n[HTTP ${this.statusCode}]`);
            console.log("Q:", this.question ?? "");
            console.log("-".repeat(60));
            console.log("Answer:", payload.answer);
            if (payload.title) console.log("Section:", payload.title);
            if (payload.sources) {
                console.log(
                    "Sources:",
                    payload.sources.map((s) => `${s.title} (${s.score})`).join(" | ")
                );
            }
            return this;
        }
    };
}


console.log("=" * 60);
console.log("   ADCET - RETRIEVAL TEST (NO LLM)");
console.log("=" * 60);

for (const question of questions) {

    const request = {
        method: "POST",
        body: { question }
    };

    const response = makeResponse();

    response.question = question;

    await handler(request, response);
}

console.log("\n" + "=".repeat(60));
console.log("TEST COMPLETE");
console.log("=".repeat(60));
