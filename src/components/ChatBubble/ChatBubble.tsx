import clsx from "clsx";
import { ChatMessageStatus } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import styles from "./ChatBubble.module.css";
import { memo } from "react";

export type ChatBubbleProps = {
  timestamp?: string;
  status?: ChatMessageStatus;
  align?: "left" | "right" | "stretch";
  isLastInGroupedMessages?: boolean;
};

const ChatBubble: React.FC<React.PropsWithChildren<ChatBubbleProps>> = ({
  children,
  timestamp,
  align,
  status,
  isLastInGroupedMessages,
}) => {
  align = align || "stretch";

  return (
    <div
      className={clsx(
        styles["chat-bubble"],
        "relative rounded-xl px-2.5 py-1.5 flex flex-row place-content-between gap-2",
        `chat-bubble chat-bubble-${align}`,
        {
          "self-start": align === "left",
          "self-end": align === "right",
          "mb-2": !!isLastInGroupedMessages,
          "bg-emerald-800": align === "right",
        }
      )}
    >
      {children}

      <div className="absolute bottom-1 right-2 inline-flex justify-end place-items-end text-gray-400 text-xs select-none gap-1">
        <span>{timestamp}</span>
        {status && <MessageStatusIcon status={status} />}
      </div>
    </div>
  );
};

export default memo(ChatBubble);
