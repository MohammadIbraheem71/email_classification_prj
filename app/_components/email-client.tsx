"use client";

import { useMemo, useState } from "react";
import svgPaths from "@/imports/Shell/svg-1d9ns9vats";
import { mockEmails } from "@/app/_components/mock-emails";
import { Sidebar } from "@/app/_components/sidebar";
import { EmailRow } from "@/app/_components/email-row";
import { ComposeWindow } from "@/app/_components/compose-window";
import { EmailDetail } from "@/app/_components/email-detail";
import type { ComposeEmailInput, Email } from "@/src/types/types";

const mailboxLabel: Record<string, string> = {
  inbox: "Inbox",
  trash: "Trash",
};

export const EmailClient = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedCategory, setSelectedCategory] = useState("inbox");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const filteredEmails = useMemo(
    () => emails.filter((email) => email.category === selectedCategory),
    [emails, selectedCategory],
  );
  const selectedEmail = useMemo(
    () => emails.find((email) => email.id === selectedEmailId) ?? null,
    [emails, selectedEmailId],
  );

  const handleSend = (composeEmail: ComposeEmailInput) => {
    const bulkBodies = composeEmail.bodies.length > 0 ? composeEmail.bodies : [""];
    const newEmails: Email[] = bulkBodies.map((body, index) => ({
      id: `${Date.now()}-${index}`,
      sender: "You",
      subject: composeEmail.subject || "(No Subject)",
      preview: body || "No body content",
      date: "Just now",
      initial: "Y",
      avatarColor: "#777bfb",
      isUnread: false,
      category: "inbox",
    }));

    setEmails((previousEmails) => [...newEmails, ...previousEmails]);
    setSelectedCategory("inbox");
    setIsComposeOpen(false);
  };

  const moveEmailToTrash = (emailId: string) => {
    setEmails((previousEmails) =>
      previousEmails.map((email) =>
        email.id === emailId ? { ...email, category: "trash", isUnread: false } : email,
      ),
    );
    setSelectedEmailId(null);
  };

  return (
    <div className="relative h-screen overflow-hidden rounded-[22px] bg-[#1b1c1d]">
      {isComposeOpen ? <ComposeWindow onClose={() => setIsComposeOpen(false)} onSend={handleSend} /> : null}
      {selectedEmail ? <EmailDetail email={selectedEmail} onBack={() => setSelectedEmailId(null)} onDelete={() => moveEmailToTrash(selectedEmail.id)} /> : null}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setIsSidebarOpen(false);
        }}
        selectedCategory={selectedCategory}
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
          <button className="grid size-[32px] place-items-center rounded-[6px] hover:bg-[#2b2c30]" onClick={() => setIsComposeOpen(true)} type="button">
            <svg className="size-[11.125px]" viewBox="0 0 11.125 11.125">
              <path d={svgPaths.p8b667a0} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      <main className="hide-scrollbar absolute inset-x-0 bottom-0 top-[56px] overflow-auto p-[33px]">
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
            onClick={() => setSelectedEmailId(email.id)}
            onDelete={moveEmailToTrash}
            showDelete={selectedCategory !== "trash"}
          />
        ))}
        <p className="pt-4 text-center text-[14px] text-[#989ca4]">That&apos;s all</p>
      </main>
    </div>
  );
};
