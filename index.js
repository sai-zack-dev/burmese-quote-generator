#!/usr/bin/env node

import prompts from "prompts";
import fs from "fs";
import ora from "ora";
import { GoogleGenerativeAI } from "@google/generative-ai";

const emotions = {
  sadness: "Sadness",
  joy: "Joy",
  love: "Love",
  anger: "Anger",
  fear: "Fear",
  surprise: "Surprise",
};

async function main() {
  let spinner;

  try {
    console.log("=== Burmese Quote Generator (Gemini) ===");

    const args = process.argv.slice(2);

    let emotionArg = args[0];
    let limitArg = args[1];
    let csvFlag = args.includes("--csv");

    let apiKey;
    let emotionName;
    let limit;
    let format;

    // CLI MODE
    if (emotionArg && limitArg) {
      const keyPrompt = await prompts({
        type: "password",
        name: "value",
        message: "Enter Gemini API Key",
      });

      apiKey = keyPrompt.value;

      if (!apiKey) {
        console.log("[!] API Key is required.");
        process.exit(1);
      }

      emotionName = emotions[emotionArg.toLowerCase()];
      limit = parseInt(limitArg);

      if (!emotionName) {
        console.log("[!] Invalid emotion.");
        console.log("Valid options: sadness, joy, love, anger, fear, surprise");
        process.exit(1);
      }

      if (isNaN(limit) || limit <= 0) {
        console.log("[!] Quote limit must be a positive number.");
        process.exit(1);
      }

      format = csvFlag ? "csv" : "txt";
    } else {
      // INTERACTIVE MODE
      const response = await prompts([
        {
          type: "password",
          name: "apiKey",
          message: "Enter Gemini API Key",
        },
        {
          type: "select",
          name: "emotion",
          message: "Select Emotion",
          choices: [
            { title: "Sadness", value: "sadness" },
            { title: "Joy", value: "joy" },
            { title: "Love", value: "love" },
            { title: "Anger", value: "anger" },
            { title: "Fear", value: "fear" },
            { title: "Surprise", value: "surprise" },
          ],
        },
        {
          type: "number",
          name: "limit",
          message: "How many quotes?",
        },
        {
          type: "select",
          name: "format",
          message: "Output format",
          choices: [
            { title: "TXT", value: "txt" },
            { title: "CSV", value: "csv" },
          ],
        },
      ]);

      apiKey = response.apiKey;
      emotionName = emotions[response.emotion];
      limit = response.limit;
      format = response.format;

      if (!apiKey) {
        console.log("[!] API Key is required.");
        process.exit(1);
      }
    }

    spinner = ora(`Generating ${limit} ${emotionName} quotes...`).start();

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const prompt = `
Generate ${limit} short Burmese quotes that express the emotion "${emotionName}".

Rules:
- Burmese language only
- One quote per line
- No numbering
- No explanation
- Each quote maximum 20 words
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    spinner.succeed("Quotes generated successfully!");

    const quotes = text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    if (quotes.length === 0) {
      console.log("[!] No quotes were generated. Try again.");
      process.exit(1);
    }

    let output;

    if (format === "csv") {
      output = "quote\n" + quotes.map((q) => `"${q}"`).join("\n");
    } else {
      output = quotes.join("\n");
    }

    const filename = `burmese_quotes_${emotionName}_${limit}.${format}`;

    fs.writeFileSync(filename, output);

    console.log(`Saved file: ${filename}`);
  } catch (error) {
    if (spinner) spinner.fail("Generation failed.");

    const status = error?.status || error?.response?.status;

    if (status === 401) {
      console.log("[!] Invalid Gemini API key.");
    } else if (status === 404) {
      console.log("[!] Gemini model not available.");
    } else if (status === 429) {
      console.log("[!] Too many requests or quota exceeded.");
    } else if (error.message?.toLowerCase().includes("quota")) {
      console.log("[!] Gemini API quota exceeded. Try again later.");
    } else if (error.code === "ENOTFOUND") {
      console.log("[!] Network error. Please check your internet connection.");
    } else {
      console.log("[!] Unexpected error occurred.");
    }

    process.exit(1);
  }
}

main();