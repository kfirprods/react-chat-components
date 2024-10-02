import clsx from "clsx";
import { ChatMessageStatus } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import styles from "./ChatBubble.module.css";

export type ChatBubbleProps = {
  timestamp: string;
  status?: ChatMessageStatus;
  align?: "left" | "right" | "stretch";
};

const ChatBubble: React.FC<React.PropsWithChildren<ChatBubbleProps>> = ({
  children,
  timestamp,
  align,
  status,
}) => {
  align = align || "stretch";

  return (
    <div
      className={clsx(
        styles["chat-bubble"],
        "rounded-lg bg-zinc-700 p-2 flex flex-row place-content-between gap-2",
        {
          "self-start": align === "left",
          "self-end": align === "right",
        }
      )}
    >
      {children}

      <div className="inline-flex justify-end place-items-end text-gray-400 text-xs select-none gap-1">
        <span>{timestamp}</span>
        {status && <MessageStatusIcon status={status} />}
      </div>
    </div>
  );
};

export default ChatBubble;
