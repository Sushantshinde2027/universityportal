// Scrapes the rendered portal pages into data/website_content.txt.
// Same role as the reference scrape_website.py: a headless Chromium
// renders each route, the HTML is parsed and the text is saved.
//
// Dev-time only. Requires:
//   npm i -D playwright && npx playwright install chromium

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_FILE = resolve(ROOT, "data/website_content.txt");

const BASE_URL = process.env.SITE_URL || "https://universityportal.vercel.app";

const ROUTES = [
    "/",
    "/about",
    "/courses",
    "/faculty",
    "/admissions",
    "/notices",
    "/faq",
    "/contact",
];

// Elements that never carry knowledge text
const REMOVE_SELECTORS = ["script", "style", "noscript", "svg"];

// UTF-8 mojibake fixes, same list as the reference scraper
const ENCODING_FIXES = {
    "â€“": "–",
    "â€”": "—",
    "â€˜": "‘",
    "â€™": "’",
    "â€œ": "“",
    "â€": "”",
    "Â©": "©",
    "Â ": " ",
    "Â": "",
};


console.log("========================================");
console.log("        ADCET PORTAL WEB SCRAPER");
console.log("========================================");

console.log(`\nSite: ${BASE_URL}`);

let chromium;

try {
    ({ chromium } = await import("playwright"));
} catch {
    console.log("\nPlaywright is not installed. Run:");
    console.log("  npm i -D playwright && npx playwright install chromium");
    process.exit(1);
}

console.log("\nOpening website...");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const pages = [];

for (const route of ROUTES) {

    const url = `${BASE_URL}${route}`;

    console.log(`Rendering ${url} ...`);

    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

    await page.waitForSelector("#root", { timeout: 15000 });

    const text = await page.evaluate((removeSelectors) => {

        for (const selector of removeSelectors) {
            document.querySelectorAll(selector).forEach((el) => el.remove());
        }

        return document.getElementById("root").innerText;

    }, REMOVE_SELECTORS);

    pages.push(`PAGE: ${route}\n\n${text}`);
}

await browser.close();


// ----------------------------------------
// Clean up the extracted text
// ----------------------------------------

let text = pages.join("\n\n");

for (const [oldText, newText] of Object.entries(ENCODING_FIXES)) {
    text = text.split(oldText).join(newText);
}

if (text.includes("à¤")) {
    try {
        text = Buffer.from(text, "latin1").toString("utf-8");
    } catch {
        // leave the text as-is when it cannot be repaired
    }
}

const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const cleanText = lines.join("\n");


// ----------------------------------------
// Save
// ----------------------------------------

mkdirSync(dirname(OUTPUT_FILE), { recursive: true });

writeFileSync(OUTPUT_FILE, cleanText, "utf-8");

console.log("\n========================================");
console.log("SCRAPING COMPLETE");
console.log("========================================");

console.log(`Characters extracted : ${cleanText.length}`);
console.log(`Pages scraped        : ${ROUTES.length}`);
console.log(`Output file          : ${OUTPUT_FILE}`);

console.log("\nStatus: SUCCESS");
console.log("========================================");
