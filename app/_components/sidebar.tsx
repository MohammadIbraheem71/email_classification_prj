"use client";

import svgPaths from "@/imports/Shell/svg-1d9ns9vats";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const categories = [{ id: "inbox", name: "Inbox", icon: "p18ed3c80", count: 0 }];
const secondaryCategories = [{ id: "trash", name: "Trash", icon: "p35939aa0" }];

export const Sidebar = ({ isOpen, onClose, onCategorySelect, selectedCategory }: SidebarProps) => {
  return (
    <aside className={`absolute inset-y-0 left-0 z-50 w-[299px] bg-[#232427] transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-[22px] py-[12px]">
        <div className="h-[10px] w-[46px]" />
        <button className="grid size-[24px] place-items-center" onClick={onClose} type="button">
          <svg className="size-[12px]" viewBox="0 0 12 12">
            <path d={svgPaths.p17f90a80} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <div className="border-t border-[#323338] pt-2">
        {[...categories, ...secondaryCategories].map((cat) => (
          <button
            className={`flex w-full items-center justify-between px-[22px] py-[10px] hover:bg-[#2b2c30] ${selectedCategory === cat.id ? "bg-[#2b2c30]" : ""}`}
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            type="button"
          >
            <div className="flex items-center gap-[12px]">
              <svg className="size-[18px]" viewBox="0 0 18 18">
                <path d={svgPaths[cat.icon as keyof typeof svgPaths]} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
              <span className="text-[14px] text-[#d1d3d6]">{cat.name}</span>
            </div>
            {"count" in cat ? <span className="text-[14px] text-[#989ca4]">{cat.count}</span> : null}
          </button>
        ))}
      </div>
    </aside>
  );
};
