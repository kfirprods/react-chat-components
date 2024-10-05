import clsx from "clsx";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export type ChatNavBarProps = {
  title: string;
  subtitle?: string;
  profilePhotoUrl?: string;
  hideBackButton?: boolean;
  backButtonUnreadCount?: number;
  onClick?: () => void;

  rightSlot?: React.ReactNode;
};

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  title,
  subtitle,
  profilePhotoUrl,
  hideBackButton,
  backButtonUnreadCount,
  onClick,
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

  const backButtonUnreadCountText = backButtonUnreadCount
    ? backButtonUnreadCount > 99
      ? "99+"
      : backButtonUnreadCount
    : "";

  return (
    <div
      className={clsx(
        "bg-zinc-800 flex flex-row gap-3 place-items-center py-2 border-b border-zinc-700 select-none",
        {
          "px-2": !!hideBackButton,
          "cursor-pointer": !!onClick,
        }
      )}
      onClick={onClick}
    >
      {!hideBackButton && (
        <button className="flex-none text-slate-100 min-w-7 h-7 flex flex-row place-items-center">
          {chevronLeft}

          {backButtonUnreadCountText && (
            <span className="mr-2">{backButtonUnreadCountText}</span>
          )}
        </button>
      )}

      <div className="flex flex-row flex-1 gap-2">
        <ProfilePicture profilePhotoUrl={profilePhotoUrl} />

        <div className="flex flex-col place-content-center">
          <p className="text-slate-100 text-sm font-semibold line-clamp-1">
            {title}
          </p>
          {subtitle && (
            <p className="text-slate-200 text-xs line-clamp-1">{subtitle}</p>
          )}
        </div>
      </div>

      {rightSlot}
    </div>
  );
};

export default ChatNavBar;
