import { classifyEmail } from "./classify_email";
import { extractInfo } from "./extract_info";
import { normalizeOpportunity } from "./normalize_oppurtunity";
import { scoreOpportunity } from "./score_oppurtunity";
import { StudentProfile, ScoredOpportunity } from "../types/types";

export async function processEmails(
  emails: string[],
  profile: StudentProfile
): Promise<ScoredOpportunity[]> {
  const results: ScoredOpportunity[] = [];

  for (const email of emails) {
    const classification = await classifyEmail(email);

    if (!classification?.is_opportunity) continue;

    const raw = await extractInfo(email);
    if (!raw) continue;

    const normalized = normalizeOpportunity(raw);
    const { score, reasons } = scoreOpportunity(normalized, profile);

    results.push({
      ...normalized,
      score,
      reasons,
    });
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}