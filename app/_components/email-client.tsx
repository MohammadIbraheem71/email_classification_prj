"use client";

import { useMemo, useState } from "react";
import svgPaths from "@/imports/Shell/svg-1d9ns9vats";
import { Sidebar } from "@/app/_components/sidebar";
import { EmailRow } from "@/app/_components/email-row";
import { ComposeWindow } from "@/app/_components/compose-window";
import { EmailDetail } from "@/app/_components/email-detail";
import { BatchAnalysisModal } from "@/app/_components/batch-analysis-modal";
import { UserProfilePage } from "@/app/_components/user-profile-page";
import type {
  BatchEmailAnalysisRequestItem,
  ComposeEmailInput,
  Email,
  EmailAnalysisCache,
  EmailAnalysisState,
  StudentProfile,
} from "@/src/types/types";

const mailboxLabel: Record<string, string> = {
  inbox: "Inbox",
  trash: "Trash",
  profile: "Profile",
};

interface EmailClientProps {
  initialEmails: Email[];
  initialProfile: StudentProfile;
  userEmail: string;
}

export const EmailClient = ({
  initialEmails,
  initialProfile,
  userEmail,
}: EmailClientProps) => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [selectedCategory, setSelectedCategory] = useState("inbox");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [isBatchAnalysisOpen, setIsBatchAnalysisOpen] = useState(false);
  const [analysisCache, setAnalysisCache] = useState<EmailAnalysisCache>({});

  const filteredEmails = useMemo(
    () => emails.filter((email) => email.category === selectedCategory),
    [emails, selectedCategory],
  );
  const selectedEmail = useMemo(
    () => emails.find((email) => email.id === selectedEmailId) ?? null,
    [emails, selectedEmailId],
  );
  const inboxCount = useMemo(
    () => emails.filter((email) => email.category === "inbox").length,
    [emails],
  );
  const selectedEmailAnalysis = useMemo<EmailAnalysisState>(() => {
    if (!selectedEmailId) {
      return { status: "idle", payload: null, error: null };
    }

    return (
      analysisCache[selectedEmailId] ?? { status: "idle", payload: null, error: null }
    );
  }, [analysisCache, selectedEmailId]);
  const selectedEmailsForBatch = useMemo<BatchEmailAnalysisRequestItem[]>(
    () =>
      emails
        .filter((email) => selectedEmailIds.includes(email.id))
        .map((email) => ({
          id: email.id,
          sender: email.sender,
          subject: email.subject,
          body: email.preview,
        })),
    [emails, selectedEmailIds],
  );

  const handleSend = async (composeEmail: ComposeEmailInput) => {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(composeEmail),
      });

      const data = (await response.json()) as { emails?: Email[]; error?: string };
      if (!response.ok) {
        return;
      }

      const newEmails = data.emails ?? [];
      setEmails((previousEmails) => [...newEmails, ...previousEmails]);
      setSelectedCategory("inbox");
      setIsComposeOpen(false);
    } catch {
      // Keep compose open so the user can retry.
    }
  };

  const moveEmailToTrash = async (emailId: string) => {
    const response = await fetch(`/api/emails/${emailId}/trash`, {
      method: "PATCH",
    });

    if (!response.ok) {
      return;
    }

    setEmails((previousEmails) =>
      previousEmails.map((email) =>
        email.id === emailId ? { ...email, category: "trash", isUnread: false } : email,
      ),
    );
    setSelectedEmailId(null);
  };

  const analyzeEmail = async (email: Email, forceRetry = false) => {
    const cachedState = analysisCache[email.id];
    if (!forceRetry && cachedState?.status === "success") {
      return;
    }

    setAnalysisCache((previousCache) => ({
      ...previousCache,
      [email.id]: { status: "loading", payload: null, error: null },
    }));

    try {
      const response = await fetch("/api/email-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailBody: email.preview, emailId: email.id }),
      });
      const data = (await response.json()) as { payload?: unknown; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to analyze email.");
      }

      setAnalysisCache((previousCache) => ({
        ...previousCache,
        [email.id]: {
          status: "success",
          payload: data.payload ?? null,
          error: null,
        },
      }));
    } catch (error) {
      setAnalysisCache((previousCache) => ({
        ...previousCache,
        [email.id]: {
          status: "error",
          payload: null,
          error: error instanceof Error ? error.message : "Email analysis failed.",
        },
      }));
    }
  };

  const handleEmailOpen = (email: Email) => {
    setSelectedEmailId(email.id);
    void analyzeEmail(email);
  };
  const saveProfile = async (nextProfile: StudentProfile) => {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: nextProfile }),
    });

    if (!response.ok) return;
    setProfile(nextProfile);
  };

  return (
    <div className="relative h-screen overflow-hidden rounded-[22px] bg-[#1b1c1d]">
      {isComposeOpen ? (
        <ComposeWindow
          onClose={() => setIsComposeOpen(false)}
          onSend={(email) => void handleSend(email)}
        />
      ) : null}
      {selectedEmail ? (
        <EmailDetail
          email={selectedEmail}
          onBack={() => setSelectedEmailId(null)}
          onDelete={() => void moveEmailToTrash(selectedEmail.id)}
          analysisState={selectedEmailAnalysis}
          onRetryAnalysis={() => void analyzeEmail(selectedEmail, true)}
        />
      ) : null}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setSelectedEmailIds([]);
          setIsSidebarOpen(false);
        }}
        selectedCategory={selectedCategory}
        inboxCount={inboxCount}
        userEmail={userEmail}
      />

      <header className="absolute inset-x-0 top-0 z-10 flex items-center gap-[22px] px-[22px] py-[12px]">
        <button className="grid size-[32px] place-items-center rounded-[6px] hover:bg-[#2b2c30]" onClick={() => setIsSidebarOpen((prev) => !prev)} type="button">
          <svg className="h-[9px] w-[11.625px]" viewBox="0 0 11.625 9">
            <path d={svgPaths.pf43da80} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <span className="rounded-[6px] px-3 py-2 text-[14px] text-[#d1d3d6] ring-1 ring-[#2b2c30]">
          {mailboxLabel[selectedCategory] ?? "Inbox"}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {selectedEmailIds.length > 0 ? (
            <button className="rounded-[6px] border border-[#323338] px-3 py-2 text-[13px] text-[#d1d3d6] hover:bg-[#2b2c30]" onClick={() => setIsBatchAnalysisOpen(true)} type="button">
              Analyze Selected ({selectedEmailIds.length})
            </button>
          ) : null}
          <button className="grid size-[32px] place-items-center rounded-[6px] hover:bg-[#2b2c30]" onClick={() => setIsComposeOpen(true)} type="button">
            <svg className="size-[11.125px]" viewBox="0 0 11.125 11.125">
              <path d={svgPaths.p8b667a0} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <main className="hide-scrollbar absolute inset-x-0 bottom-0 top-[56px] overflow-auto p-[33px]">
        {selectedCategory === "profile" ? (
          <UserProfilePage
            onSaveProfile={saveProfile}
            profile={profile}
            userEmail={userEmail}
          />
        ) : (
          <>
            {filteredEmails.map((email) => (
              <EmailRow
                key={email.id}
                id={email.id}
                sender={email.sender}
                subject={email.subject}
                preview={email.preview}
                date={email.date}
                initial={email.initial}
                avatarColor={email.avatarColor}
                isUnread={email.isUnread}
                onClick={() => handleEmailOpen(email)}
                onDelete={(emailId) => void moveEmailToTrash(emailId)}
                showDelete={selectedCategory !== "trash"}
                isSelected={selectedEmailIds.includes(email.id)}
                onToggleSelect={(emailId) =>
                  setSelectedEmailIds((previousIds) =>
                    previousIds.includes(emailId)
                      ? previousIds.filter((id) => id !== emailId)
                      : [...previousIds, emailId],
                  )
                }
              />
            ))}
            <p className="pt-4 text-center text-[14px] text-[#989ca4]">That&apos;s all</p>
          </>
        )}
      </main>
      {isBatchAnalysisOpen ? (
        <BatchAnalysisModal
          onClose={() => setIsBatchAnalysisOpen(false)}
          selectedEmails={selectedEmailsForBatch}
        />
      ) : null}
    </div>
  );
};
