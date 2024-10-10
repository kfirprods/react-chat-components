// "use client";

import clsx from "clsx";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import ChevronLeftIcon from "../svg-icons/ChevronLeftIcon";

export type ChatNavBarProps = {
  title: string;
  subtitle?: string;
  profilePhotoUrl?: string;
  hideBackButton?: boolean;
  backButtonUnreadCount?: number;
  onClose?: () => void;
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
  onClose,
  rightSlot,
}) => {
  const backButtonUnreadCountText = backButtonUnreadCount
    ? backButtonUnreadCount > 99
      ? "99+"
      : backButtonUnreadCount
    : "";

  const handleBackButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose?.();
  };

  return (
    <div
      className={clsx(
        "chat-nav-bar flex flex-row gap-3 place-items-center py-2 border-b select-none",
        {
          "px-2": !!hideBackButton,
          "cursor-pointer": !!onClick,
        }
      )}
      onClick={onClick}
    >
      {!hideBackButton && (
        <button
          className="chat-nav-bar-back-button flex-none min-w-7 h-7 flex flex-row place-items-center"
          onClick={handleBackButtonClick}
        >
          <ChevronLeftIcon />

          {backButtonUnreadCountText && (
            <span className="mr-2">{backButtonUnreadCountText}</span>
          )}
        </button>
      )}

      <div className="flex flex-row flex-1 gap-2">
        <ProfilePicture profilePhotoUrl={profilePhotoUrl} />

        <div className="flex flex-col place-content-center">
          <p className="chat-nav-bar-title text-sm font-semibold line-clamp-1">
            {title}
          </p>
          {subtitle && (
            <p className="chat-nav-bar-subtitle text-xs line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {rightSlot}
    </div>
  );
};

export default ChatNavBar;
