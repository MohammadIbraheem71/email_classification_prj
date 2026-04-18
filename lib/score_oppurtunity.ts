import { Opportunity, StudentProfile } from "../types/types";


// this function gives a score to an already parsed oppurtinity (parsed by the previous function)
// the scores are assigned based on various factors
// the scoring is pretty self explanatory
export function scoreOpportunity(op: Opportunity, profile: StudentProfile) {
  let score = 0;
  const reasons: string[] = [];

  // Type match
  if (
    op.opportunity_type &&
    profile.preferred_types.includes(op.opportunity_type)
  ) {
    score += 20;
    reasons.push("Matches preferred type");
  }

  // Deadline urgency
  if (op.deadline) {
    const daysLeft =
      (op.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

    if (daysLeft < 3) {
      score += 50;
      reasons.push("Deadline very close");
    } else if (daysLeft < 7) {
      score += 30;
      reasons.push("Deadline soon");
    } else if (daysLeft < 14) {
      score += 10;
      reasons.push("Upcoming deadline");
    }
  }

  // Location match
  if (op.location && op.location.includes(profile.location)) {
    score += 10;
    reasons.push("Matches preferred location");
  }

  return { score, reasons };
}