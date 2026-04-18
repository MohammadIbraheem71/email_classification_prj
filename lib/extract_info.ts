import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function extractInfo(email: string) {
  const prompt = `
Extract structured information.

Return ONLY JSON:
{
  "title": "",
  "opportunity_type": "",
  "deadline": "",
  "eligibility": "",
  "required_documents": [],
  "location": "",
  "link": ""
}

If missing, return null.

Email:
${email}
`;

  const res = await model.generateContent(prompt);
  let text = res.response.text();

  text = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}