import "dotenv/config"; // 1. Load environment variables
import { GoogleGenerativeAI } from "@google/generative-ai";

// 2. Access the key safely from process.env
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Error: GEMINI_API_KEY is not defined in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function classifyEmail(email: string) {
  const prompt = `
You are an AI that classifies emails.
Determine if the following email contains a real opportunity.
Return ONLY valid JSON:
{
  "is_opportunity": true,
  "type": "internship"
}

Email:
${email}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    // Some models wrap JSON in markdown blocks like ```json ... ```
    // This regex helps clean it if the model includes them
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (err) {
    console.log("❌ Classification JSON parse failed");
    return null;
  }
}

async function extractInfo(email: string) {
  const prompt = `
Extract structured information from this email.

Return ONLY valid JSON with:
{
  "title": "",
  "opportunity_type": "",
  "deadline": "",
  "eligibility": "",
  "required_documents": [],
  "location": "",
  "link": ""
}

If any field is missing, return null for it.

Email:
${email}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (err) {
    console.log("❌ Extraction JSON parse failed");
    return null;
  }
}

export async function processEmail(email: string) {
  console.log("📩 Processing email...\n");

  const classification = await classifyEmail(email);
  console.log("📊 Classification:", classification);

  let extractedData = null;
  if (classification?.is_opportunity) {
    extractedData = await extractInfo(email);
    console.log("\n📦 Extracted Data:", extractedData);
  } else {
    console.log("\n🚫 Not an opportunity. Skipping extraction.");
  }

  return { classification, extractedData };
}
