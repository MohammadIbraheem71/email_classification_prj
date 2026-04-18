"use client";

import type { Email } from "@/src/types/types";

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
}

export const EmailDetail = ({ email, onBack }: EmailDetailProps) => {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[56px] z-40 overflow-auto bg-[#1b1c1d] p-[33px]">
      <div className="mx-auto max-w-[765px] rounded-[8px] bg-[#232427] p-8">
        <button className="mb-6 rounded-[6px] border border-[#2b2c30] px-3 py-2 text-[14px] text-[#d1d3d6]" onClick={onBack} type="button">
          Back
        </button>
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
