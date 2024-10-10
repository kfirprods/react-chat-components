"use client";

import { ChatMessageStatus } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export type ChatPreviewProps = {
  name: string;
  previewText: string;
  profilePhotoUrl?: string;
  status?: ChatMessageStatus;
  timestamp?: string;
  slotBelowTimestamp?: React.ReactNode;
};

const ChatPreview: React.FC<ChatPreviewProps> = ({
  name,
  previewText,
  profilePhotoUrl,
  status,
  timestamp,
  slotBelowTimestamp,
}) => {
  return (
    <div className="flex flex-row gap-3 text-sm select-none min-h-16">
      <div className="self-center">
        <ProfilePicture profilePhotoUrl={profilePhotoUrl} size="lg" />
      </div>

      <div className="flex-1">
        <h3 className="chat-preview-title text-start font-semibold line-clamp-1">
          {name}
        </h3>
        <p className="chat-preview-subtitle text-start line-clamp-2 subtext-color leading-[1.1rem]">
          {status && (
            <span className="inline-flex mr-1 translate-y-0.5">
              <MessageStatusIcon status={status} />
            </span>
          )}
          <span>{previewText}</span>
        </p>
      </div>

      <div className="chat-preview-timestamp flex flex-col items-end gap-1">
        {timestamp && (
          <div className="self-start text-xs subtext-color flex-none">
            {timestamp}
          </div>
        )}

        {slotBelowTimestamp && <div>{slotBelowTimestamp}</div>}
      </div>
    </div>
  );
};

export default ChatPreview;
