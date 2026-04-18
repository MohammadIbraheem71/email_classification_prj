"use client";

interface EmailRowProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  initial: string;
  avatarColor: string;
  isUnread: boolean;
  onClick: () => void;
  onDelete: (emailId: string) => void;
  showDelete: boolean;
}

export const EmailRow = ({
  id,
  sender,
  subject,
  preview,
  date,
  initial,
  avatarColor,
  isUnread,
  onClick,
  onDelete,
  showDelete,
}: EmailRowProps) => {
  return (
    <div className="h-[66px] w-full cursor-pointer border-y border-[#323338] px-[17px] hover:bg-[#2b2c30]" onClick={onClick}>
      <div className="flex h-full items-center gap-[33px]">
        <div className="flex min-w-0 flex-1 items-center gap-[33px]">
          <div className="flex items-center gap-[5px]">
            <div className="grid size-[24px] place-items-center">
              {isUnread ? <div className="size-[5px] rounded-full bg-[#777bfb]" /> : null}
            </div>
            <div className="grid size-[24px] place-items-center rounded-full text-[12px] text-[#d1d3d6]" style={{ backgroundColor: avatarColor }}>
              {initial}
            </div>
          </div>
          <p className="whitespace-nowrap text-[14px] text-[#989ca4]">{sender}</p>
          <p className="whitespace-nowrap text-[14px] text-[#d1d3d6]">{subject}</p>
          <p className="min-w-0 flex-1 truncate text-[14px] text-[#989ca4]">{preview}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap text-[14px] text-[#989ca4]">{date}</p>
          {showDelete ? (
            <button
              className="grid size-8 place-items-center rounded-[6px] text-[#989ca4] hover:bg-[#232427] hover:text-[#f87171]"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(id);
              }}
              type="button"
            >
              <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                <path d="M1.75 3.5H12.25M5.25 6.125V10.5M8.75 6.125V10.5M2.625 3.5L3.5 11.375C3.5 11.8582 3.89175 12.25 4.375 12.25H9.625C10.1082 12.25 10.5 11.8582 10.5 11.375L11.375 3.5M5.25 3.5V2.625C5.25 2.14175 5.64175 1.75 6.125 1.75H7.875C8.35825 1.75 8.75 2.14175 8.75 2.625V3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
