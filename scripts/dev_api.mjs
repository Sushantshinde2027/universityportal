// Local server for the bot endpoint, so the widget can be tried
// without deploying.
//
//   node scripts/dev_api.mjs        -> http://localhost:3001/api/ask
//
// Point the frontend at it with:  VITE_API_BASE=http://localhost:3001 npm run dev

import { createServer } from "node:http";

import handler from "../api/ask.js";

const PORT = Number(process.env.PORT || 3001);


const server = createServer(async (request, response) => {

    let raw = "";

    for await (const chunk of request) {
        raw += chunk;
    }

    let body = {};

    try {
        body = raw ? JSON.parse(raw) : {};
    } catch {
        body = {};
    }

    const req = {
        method: request.method,
        body,
        query: {}
    };

    const res = {
        statusCode: 200,

        status(code) {
            this.statusCode = code;
            return this;
        },

        json(payload) {
            response.statusCode = this.statusCode;
            response.setHeader("content-type", "application/json");
            response.end(JSON.stringify(payload));
            return this;
        }
    };

    await handler(req, res);
});


server.listen(PORT, () => {

    console.log("ADCET bot endpoint running");
    console.log(`  POST http://localhost:${PORT}/api/ask`);
    console.log('  body: { "question": "Where is ADCET located?" }');
});
