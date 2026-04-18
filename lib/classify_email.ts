import { getOpenAIClient, getOpenAIModel } from "./openai_client";

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