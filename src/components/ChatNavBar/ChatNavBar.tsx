import ProfilePicture from "../ProfilePicture/ProfilePicture";

export type ChatNavBarProps = {
  title: string;
  subtitle?: string;
  profilePhotoUrl?: string;

  rightSlot?: React.ReactNode;
};

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  title,
  subtitle,
  profilePhotoUrl,
  rightSlot,
}) => {
  const chevronLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );

  return (
    <div className="bg-zinc-700 flex flex-row gap-2 place-items-center py-2 border-b border-zinc-600 select-none">
      <button className="flex-none text-slate-100 w-7 h-7">
        {chevronLeft}
      </button>

      <div className="flex flex-row flex-1 gap-2">
        <ProfilePicture profilePhotoUrl={profilePhotoUrl} />

        <div className="flex flex-col">
          <div className="text-slate-100 text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-slate-200 text-xs">{subtitle}</div>}
        </div>
      </div>

      {rightSlot}
    </div>
  );
};

export default ChatNavBar;
