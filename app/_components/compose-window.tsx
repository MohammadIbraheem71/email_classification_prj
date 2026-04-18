"use client";

import { useState } from "react";
import svgPaths from "@/imports/Shell-1/svg-qmpzainqqf";
import type { ComposeEmailInput } from "@/src/types/types";

interface ComposeWindowProps {
  onClose: () => void;
  onSend: (email: ComposeEmailInput) => void;
}

export const ComposeWindow = ({ onClose, onSend }: ComposeWindowProps) => {
  const [subject, setSubject] = useState("");
  const [bodies, setBodies] = useState([""]);

  const updateBody = (value: string, index: number) => {
    setBodies((previousBodies) =>
      previousBodies.map((bodyValue, bodyIndex) =>
        bodyIndex === index ? value : bodyValue,
      ),
    );
  };

  const addBodyField = () => {
    setBodies((previousBodies) => [...previousBodies, ""]);
  };

  const handleSend = () => {
    onSend({
      subject: subject.trim(),
      bodies: bodies.map((body) => body.trim()).filter(Boolean),
    });
  };

  return (
    <div className="hide-scrollbar absolute inset-0 z-50 overflow-y-auto bg-[#1b1c1d]">
      <div className="flex items-center gap-[22px] px-[22px] py-[12px]">
        <button className="grid size-[32px] place-items-center rounded-[6px] hover:bg-[#2b2c30]" onClick={onClose} type="button">
          <svg className="h-[9px] w-[11.625px]" viewBox="0 0 11.625 9">
            <path d={svgPaths.pf43da80} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <span className="text-[14px] text-[#d1d3d6]">Drafts</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="rounded-[6px] px-3 py-2 text-[14px] text-[#d1d3d6] ring-1 ring-[#2b2c30] hover:bg-[#232427]" onClick={onClose} type="button">
            Back
          </button>
          <button className="rounded-[6px] bg-[#2b2c30] px-3 py-2 text-[14px] text-[#d1d3d6] ring-1 ring-[#323338] hover:bg-[#323338]" onClick={handleSend} type="button">
            Send
          </button>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[650px] space-y-4 px-6 pb-8 text-[14px] text-[#d1d3d6]">
        <input className="h-10 w-full rounded-[6px] bg-[#232427] px-3 outline-none" onChange={(event) => setSubject(event.target.value)} placeholder="Subject" value={subject} />
        {bodies.map((body, index) => (
          <textarea
            className="h-40 w-full rounded-[6px] bg-[#232427] p-3 outline-none"
            key={`body-field-${index}`}
            onChange={(event) => updateBody(event.target.value, index)}
            placeholder={`Body ${index + 1}`}
            value={body}
          />
        ))}
        <button
          className="flex h-10 w-full items-center justify-center rounded-[6px] bg-[#232427] text-[20px] text-[#d1d3d6] ring-1 ring-[#323338] hover:bg-[#2b2c30]"
          onClick={addBodyField}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
};
