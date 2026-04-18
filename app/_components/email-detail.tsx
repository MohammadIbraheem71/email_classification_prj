"use client";

import type { Email } from "@/src/types/types";

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
  onDelete: () => void;
}

export const EmailDetail = ({ email, onBack, onDelete }: EmailDetailProps) => {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[56px] z-40 overflow-auto bg-[#1b1c1d] p-[33px]">
      <div className="mx-auto max-w-[765px] rounded-[8px] bg-[#232427] p-8">
        <div className="mb-6 flex items-center justify-between">
          <button className="rounded-[6px] border border-[#2b2c30] px-3 py-2 text-[14px] text-[#d1d3d6]" onClick={onBack} type="button">
            Back
          </button>
          <button className="flex items-center gap-2 rounded-[6px] border border-[#2b2c30] px-3 py-2 text-[14px] text-[#989ca4] hover:text-[#f87171]" onClick={onDelete} type="button">
            <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
              <path d="M1.75 3.5H12.25M5.25 6.125V10.5M8.75 6.125V10.5M2.625 3.5L3.5 11.375C3.5 11.8582 3.89175 12.25 4.375 12.25H9.625C10.1082 12.25 10.5 11.8582 10.5 11.375L11.375 3.5M5.25 3.5V2.625C5.25 2.14175 5.64175 1.75 6.125 1.75H7.875C8.35825 1.75 8.75 2.14175 8.75 2.625V3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            </svg>
            Delete
          </button>
        </div>
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-full text-xs text-[#d1d3d6]" style={{ backgroundColor: email.avatarColor }}>
            {email.initial}
          </div>
          <h2 className="text-sm text-white">{email.subject}</h2>
        </div>
        <div className="space-y-2 text-xs">
          <p className="text-[#989ca4]">
            From <span className="text-[#d1d3d6]">{email.sender}</span>
          </p>
          <p className="text-[#989ca4]">
            To <span className="text-[#d1d3d6]">You</span>
          </p>
          <p className="text-[#989ca4]">{email.date}</p>
        </div>
        <div className="mt-6 rounded-[8px] border border-[#323338] p-5 text-[14px] text-[#d1d3d6]">{email.preview}</div>
      </div>
    </div>
  );
};
