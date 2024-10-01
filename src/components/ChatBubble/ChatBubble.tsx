import { ChatMessageStatus } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";

export type ChatBubbleProps = {
  timestamp: string;
  status?: ChatMessageStatus;
};

const ChatBubble: React.FC<React.PropsWithChildren<ChatBubbleProps>> = ({
  children,
  timestamp,

  status,
}) => {
  return (
    <div className="rounded bg-zinc-700 p-2 flex flex-row place-content-between">
      {children}

      <div className="inline-flex justify-end place-items-end text-gray-400 text-xs select-none gap-1">
        <span>{timestamp}</span>
        {status && <MessageStatusIcon status={status} />}
      </div>
    </div>
  );
};

export default ChatBubble;
