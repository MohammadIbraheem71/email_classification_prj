import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function classifyEmail(email: string) {
  const prompt = `
Determine if this email contains a real opportunity.

Return ONLY JSON:
{
  "is_opportunity": true/false,
  "type": "internship/scholarship/competition/fellowship/admission/other"
}

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