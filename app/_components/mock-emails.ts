import type { Email } from "@/src/types/types";

export const mockEmails: Email[] = [
  {
    id: "sample-1",
    sender: "Tech Internship Hub",
    subject: "Application Open: Backend Engineering Internship (Summer 2026)",
    preview:
      "Hello student, we are inviting applications for our Backend Engineering Internship focused on APIs, data pipelines, and production debugging. Deadline: within 5 days from now; if you are reading this today, submit by 2026-04-23 23:59 UTC. Eligibility: undergraduate CS/SE students in years 2-4 with Node.js, SQL, and Git fundamentals. Required documents: updated CV, unofficial transcript, and a short 300-word statement describing one backend project. Location: on-site in Lahore, Pakistan, with optional 1-day/week remote flexibility. Link: https://techinternhub.example/apply/backend-summer-2026",
    date: "Today",
    initial: "T",
    avatarColor: "#3b82f6",
    isUnread: true,
    category: "inbox",
  },
  {
    id: "sample-2",
    sender: "Scholarship Desk",
    subject: "Merit Scholarship 2026 - New Round Open",
    preview:
      "This email announces the Merit Scholarship 2026 for high-performing students needing financial support. Deadline: 2026-04-30 (11:59 PM local campus time). Eligibility: full-time undergraduate students with minimum CGPA 3.3/4.0 and at least one completed semester. Required documents: transcript, one recommendation letter, copy of national ID/passport, and a financial need statement (max 700 words). Location: scholarship is tied to on-campus study at SOFTEC partner universities in Pakistan. Link: https://scholarshipdesk.example/programs/merit-2026",
    date: "Today",
    initial: "S",
    avatarColor: "#22c55e",
    isUnread: true,
    category: "inbox",
  },
  {
    id: "sample-3",
    sender: "AI Club Newsletter",
    subject: "AI Fellowship Cohort - Application Details Inside",
    preview:
      "Our club is recommending the National AI Fellowship Cohort for students interested in applied machine learning and public-impact projects. Deadline: next Friday at 18:00 UTC (convert based on current week). Eligibility: students or fresh graduates with Python basics and at least one ML course/project. Required documents: resume, GitHub profile link, 2-minute intro video link, and one-page proposal on a social-impact AI problem. Location: hybrid program; weekly remote sessions plus two in-person bootcamps in Islamabad. Link: https://aiclub.example/fellowship/cohort-2026",
    date: "Yesterday",
    initial: "A",
    avatarColor: "#a855f7",
    isUnread: false,
    category: "inbox",
  },
  {
    id: "sample-4",
    sender: "Cloud Academy",
    subject: "Cloud Innovation Competition - Team Registration Invitation",
    preview:
      "You are invited to the Cloud Innovation Competition where student teams build cloud-native products and present to industry judges. Deadline: submissions close in 2 weeks from the date of this email; registration form closes 3 days earlier. Eligibility: teams of 2-4 university students, at least one member with intermediate cloud knowledge (AWS/Azure/GCP). Required documents: team roster, project proposal deck (10 slides), architecture diagram, and mentor consent form. Location: remote qualifiers, then on-site final round in Karachi, Pakistan. Link: https://cloudacademy.example/challenge/register",
    date: "Yesterday",
    initial: "C",
    avatarColor: "#f97316",
    isUnread: true,
    category: "inbox",
  },
  {
    id: "sample-5",
    sender: "Founders Fellowship",
    subject: "Final Call: Product Fellowship 2026 (Stipend + Mentorship)",
    preview:
      "Final reminder for the Product Fellowship 2026 designed for students building startup-style digital products with guidance from founders. Deadline: tonight at 23:59 PKT (treat this as urgent if current date is close). Eligibility: undergraduate or graduate students with a working prototype or strong validated idea. Required documents: founder profile, product concept note, demo video link, and optional traction evidence (users, waitlist, pilots). Location: mostly remote with monthly in-person founder circles in Lahore. Link: https://foundersfellowship.example/product/apply",
    date: "Apr 17",
    initial: "F",
    avatarColor: "#14b8a6",
    isUnread: true,
    category: "inbox",
  },
  {
    id: "sample-6",
    sender: "Research Office",
    subject: "Open Position: Undergraduate Research Assistant (LLM Evaluation Lab)",
    preview:
      "The Computing Research Office is hiring a paid Undergraduate Research Assistant to work on LLM evaluation pipelines and prompt benchmarking for 12 weeks. Deadline: apply by 2026-05-06T17:00:00Z. Eligibility: BSCS/BSAI students who have completed Data Structures and one ML/NLP course. Required documents: CV, transcript, writing sample (1-2 pages), and one faculty recommendation email. Location: on-site research lab at the main campus in Islamabad; selected tasks may be completed remotely. Link: https://researchoffice.example/jobs/llm-ra-2026",
    date: "Apr 17",
    initial: "R",
    avatarColor: "#ef4444",
    isUnread: false,
    category: "inbox",
  },
  {
    id: "sample-7",
    sender: "Global Exchange",
    subject: "Global Exchange Program - Fall Semester Abroad",
    preview:
      "Applications are now open for the Global Exchange Program for a Fall semester abroad at partner institutions in Europe and East Asia. Deadline: within 10 days of this announcement for priority processing; final deadline is 2026-05-20. Eligibility: completed at least 2 semesters, CGPA 3.0+, and language proficiency where required by host university. Required documents: transcript, passport copy, motivation letter, preferred university list, and provisional study plan. Location: host universities in Germany, Italy, South Korea, and Japan; pre-departure orientation at home campus. Link: https://globalexchange.example/fall-abroad/apply",
    date: "Apr 16",
    initial: "G",
    avatarColor: "#6366f1",
    isUnread: false,
    category: "inbox",
  },
  {
    id: "sample-8",
    sender: "Open Source Program Office",
    subject: "Mentored Open Source Program - Contributor Applications",
    preview:
      "The Mentored Open Source Program is accepting contributor applications for summer projects across distributed systems, developer tools, and AI infrastructure. Deadline: next Monday, 14:00 UTC. Eligibility: students with demonstrable coding activity (GitHub commits/issues) and ability to commit 8-10 hours weekly. Required documents: GitHub profile, technical resume, project preference list, and short proposal for one selected repository. Location: fully remote with mentors from global open-source communities. Link: https://opensourceoffice.example/mentored-program",
    date: "Apr 15",
    initial: "O",
    avatarColor: "#0ea5e9",
    isUnread: true,
    category: "inbox",
  },
  {
    id: "sample-9",
    sender: "Careers Center",
    subject: "Career Readiness Workshop Series - Registration",
    preview:
      "The Careers Center is hosting a Career Readiness Workshop Series covering behavioral interviews, technical problem solving, and resume review with alumni recruiters. Deadline: register in 3 days to secure a coaching slot. Eligibility: open to all enrolled students; final-year students receive priority mock interviews. Required documents: latest resume, preferred role track (software/data/product), and one paragraph about current preparation challenges. Location: hybrid delivery, with virtual sessions and in-person mock interviews at Career Hall, Block B. Link: https://careers.example/workshops/register",
    date: "Apr 15",
    initial: "C",
    avatarColor: "#84cc16",
    isUnread: false,
    category: "inbox",
  },
  {
    id: "sample-10",
    sender: "DevCon Student Track",
    subject: "Developer Conference Grant + Student Project Showcase",
    preview:
      "Your student track application has been shortlisted for a conference ticket grant and project showcase slot at DevCon 2026. Deadline: confirm participation by 2026-04-25 and submit travel preference form within 48 hours after confirmation. Eligibility: currently enrolled student with an active software project and availability for the full event schedule. Required documents: project abstract, repository link, university ID proof, and travel declaration form. Location: conference venue in Dubai, UAE, with limited remote participation for workshop sessions. Link: https://devconstudenttrack.example/grants/confirm",
    date: "Apr 14",
    initial: "D",
    avatarColor: "#f59e0b",
    isUnread: true,
    category: "inbox",
  },
];
