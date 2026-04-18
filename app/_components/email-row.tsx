"use client";

interface EmailRowProps {
  sender: string;
  subject: string;
  preview: string;
  date: string;
  initial: string;
  avatarColor: string;
  isUnread: boolean;
  onClick: () => void;
}

export const EmailRow = ({
  sender,
  subject,
  preview,
  date,
  initial,
  avatarColor,
  isUnread,
  onClick,
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
        <p className="whitespace-nowrap text-[14px] text-[#989ca4]">{date}</p>
      </div>
    </div>
  );
};
