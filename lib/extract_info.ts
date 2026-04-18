import { getOpenAIClient, getOpenAIModel } from "./openai_client";

export async function extractInfo(email: string) {
  const currentUtc = new Date().toISOString();
  const prompt = `
Extract structured information.

Current UTC datetime: ${currentUtc}

Return ONLY JSON in this exact shape:
{
  "title": "",
  "opportunity_type": "",
  "deadline": "",
  "eligibility": "",
  "required_documents": [],
  "location": "",
  "link": ""
}

CRITICAL:
- Field descriptions (follow strictly):
  - "title": A short, clear summary of what the email is about. Capture the main opportunity/project in one concise line.
  - "opportunity_type": Prefer one of: "Internship", "Fellowship", "Competition". If none fits, use another single-word noun found or strongly implied in the email (e.g. "Scholarship", "Grant", "Workshop", "Program").
  - "deadline": The due date/time for application or submission. If relative time is given ("in 3 days", "within 2 weeks", "next Friday"), calculate the absolute date from the provided UTC datetime and output ISO 8601.
  - "eligibility": Who can apply/participate. Include degree/program/year, nationality, skills, GPA, or other restrictions when mentioned.
  - "required_documents": Array of required submission items. Include specific document names and short context when useful (e.g. ["CV/Resume", "Statement of Purpose (max 500 words)", "Transcript"]).
  - "location": The opportunity location details, elaborated when possible (city, country, remote/on-site/hybrid, host institution/organization if available).
  - "link": Include a URL only if any link is provided in the email; otherwise null.
- Always try to extract a deadline if any date-like phrase exists (e.g. "apply by May 12", "deadline: 2026-04-30", "submissions close Friday").
- Use the provided UTC datetime to resolve relative phrases like "tomorrow", "next Friday", "within 2 days", etc.
- Convert the deadline to ISO 8601 when possible:
  - If exact time is known: "YYYY-MM-DDTHH:mm:ssZ"
  - If only date is known: "YYYY-MM-DD"
- If no deadline is present at all, set "deadline" to null.
- If other fields are missing, set them to null (or [] for required_documents).

Email:
${email}
`;

  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: getOpenAIModel(),
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "Return strict JSON only.",
      },
      { role: "user", content: prompt },
    ],
  });
  const text = response.choices[0]?.message?.content?.trim() ?? "";

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}