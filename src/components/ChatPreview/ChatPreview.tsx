import { ChatMessageStatus } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export type ChatPreviewProps = {
  name: string;
  previewText: string;
  profilePhotoUrl?: string;
  status?: ChatMessageStatus;
  timestamp?: string;
};

const ChatPreview: React.FC<ChatPreviewProps> = ({
  name,
  previewText,
  profilePhotoUrl,
  status,
  timestamp,
}) => {
  return (
    <div className="flex flex-row gap-3 text-sm text-slate-200 select-none">
      <ProfilePicture profilePhotoUrl={profilePhotoUrl} size="xl" />

      <div className="flex-1">
        <h3 className="font-semibold line-clamp-1">{name}</h3>
        <p className="line-clamp-2 text-gray-400">
          <span className="inline-flex mr-0.5 translate-y-0.5">
            {status && <MessageStatusIcon status={status} />}
          </span>

          <span>{previewText}</span>
        </p>
      </div>

      {timestamp && <div className="text-gray-400 flex-none">{timestamp}</div>}
    </div>
  );
};

export default ChatPreview;
