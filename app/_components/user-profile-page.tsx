"use client";

import { useState } from "react";
import type { StudentProfile } from "@/src/types/types";

type EditableField = "degree" | "semester" | "cgpa" | "location";

interface UserProfilePageProps {
  profile: StudentProfile;
  userEmail: string;
  onSaveProfile: (profile: StudentProfile) => Promise<void>;
}

export const UserProfilePage = ({
  profile,
  userEmail,
  onSaveProfile,
}: UserProfilePageProps) => {
  const [localProfile, setLocalProfile] = useState<StudentProfile>(profile);
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [draftValue, setDraftValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (field: EditableField) => {
    setEditingField(field);
    setDraftValue(String(localProfile[field]));
  };
  const saveEdit = () => {
    if (!editingField) return;
    setLocalProfile((prev) => ({
      ...prev,
      [editingField]:
        editingField === "semester" || editingField === "cgpa"
          ? Number(draftValue) || 0
          : draftValue,
    }));
    setEditingField(null);
    setDraftValue("");
  };
  const addBadge = (key: "skills" | "preferred_types") => {
    const value = window.prompt(`Add ${key === "skills" ? "skill" : "preferred type"}`);
    if (!value?.trim()) return;
    setLocalProfile((prev) => ({ ...prev, [key]: [...prev[key], value.trim()] }));
  };
  const removeBadge = (key: "skills" | "preferred_types", value: string) =>
    setLocalProfile((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
    }));
  const editIcon = (field: EditableField) => (
    <button className="absolute right-3 top-3 text-[#d1d3d6] transition hover:text-[#9ca3af]" onClick={() => startEdit(field)} type="button" aria-label={`Edit ${field}`}>
      <svg className="size-[15px]" viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5L14.5 5.5L4 16V20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12.5 7.5L16.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    </button>
  );
  const saveProfileChanges = async () => {
    setIsSaving(true);
    await onSaveProfile(localProfile);
    setIsSaving(false);
  };

  return (
    <section className="mx-auto max-w-[760px] rounded-[16px] border border-[#323338] bg-[#232427] p-6">
      <div className="mb-6 flex items-center gap-4 border-b border-[#323338] pb-6">
        <div className="grid size-14 place-items-center rounded-full bg-[#777bfb] text-[20px] font-semibold text-white">U</div>
        <div><h2 className="text-[22px] font-semibold text-[#f4f5f7]">User Profile</h2><p className="text-[14px] text-[#989ca4]">{userEmail}</p></div>
      </div>

      {editingField ? (
        <div className="mb-4 flex gap-2 rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-3">
          <input className="w-full rounded-[8px] border border-[#3a3d45] bg-[#232427] px-3 py-2 text-[14px] text-[#d1d3d6] outline-none" value={draftValue} onChange={(event) => setDraftValue(event.target.value)} />
          <button className="rounded-[8px] border border-[#3a3d45] px-3 text-[13px] text-[#d1d3d6] hover:bg-[#2b2c30]" onClick={saveEdit} type="button">Save</button>
        </div>
      ) : null}

      <div className="grid gap-4 text-[14px]">
        <div className="relative rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-4"><p className="mb-1 text-[#989ca4]">Degree</p><p className="text-[#d1d3d6]">{localProfile.degree}</p>{editIcon("degree")}</div>
        <div className="relative rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-4"><p className="mb-1 text-[#989ca4]">Semester</p><p className="text-[#d1d3d6]">{localProfile.semester}</p>{editIcon("semester")}</div>
        <div className="relative rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-4"><p className="mb-1 text-[#989ca4]">CGPA</p><p className="text-[#d1d3d6]">{localProfile.cgpa}</p>{editIcon("cgpa")}</div>

        <div className="rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-4">
          <div className="mb-2 flex items-center justify-between"><p className="text-[#989ca4]">Skills</p><button className="rounded-full border border-[#3a3d45] px-2 text-[14px] text-[#d1d3d6] hover:text-[#9ca3af]" onClick={() => addBadge("skills")} type="button" aria-label="Add skill">+</button></div>
          <div className="flex flex-wrap gap-2">{localProfile.skills.map((skill) => <span className="inline-flex items-center gap-2 rounded-full border border-[#3a3d45] bg-[#2b2c30] px-3 py-1 text-[13px] text-[#d1d3d6]" key={skill}>{skill}<button className="text-[#d1d3d6] transition hover:text-[#9ca3af]" onClick={() => removeBadge("skills", skill)} type="button" aria-label={`Remove ${skill}`}>x</button></span>)}</div>
        </div>

        <div className="rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-4">
          <div className="mb-2 flex items-center justify-between"><p className="text-[#989ca4]">Preferred Types</p><button className="rounded-full border border-[#3a3d45] px-2 text-[14px] text-[#d1d3d6] hover:text-[#9ca3af]" onClick={() => addBadge("preferred_types")} type="button" aria-label="Add preferred type">+</button></div>
          <div className="flex flex-wrap gap-2">{localProfile.preferred_types.map((type) => <span className="inline-flex items-center gap-2 rounded-full border border-[#3a3d45] bg-[#2b2c30] px-3 py-1 text-[13px] text-[#d1d3d6]" key={type}>{type}<button className="text-[#d1d3d6] transition hover:text-[#9ca3af]" onClick={() => removeBadge("preferred_types", type)} type="button" aria-label={`Remove ${type}`}>x</button></span>)}</div>
        </div>

        <div className="relative rounded-[12px] border border-[#323338] bg-[#1b1c1d] p-4"><p className="mb-1 text-[#989ca4]">Location</p><p className="text-[#d1d3d6]">{localProfile.location}</p>{editIcon("location")}</div>
      </div>
      <button className="mt-4 rounded-[8px] border border-[#3a3d45] px-4 py-2 text-sm text-[#d1d3d6] hover:bg-[#2b2c30]" disabled={isSaving} onClick={() => void saveProfileChanges()} type="button">
        {isSaving ? "Saving..." : "Save profile"}
      </button>
    </section>
  );
};
