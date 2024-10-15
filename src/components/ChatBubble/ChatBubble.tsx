// "use client";

import clsx from "clsx";
import { ChatMessageStatus } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import { memo } from "react";

export type ChatBubbleProps = {
  timestamp?: string;
  status?: ChatMessageStatus;
  align?: "left" | "right" | "stretch";
  isLastInGroupedMessages?: boolean;

  aboveBubbleSlot?: React.ReactNode;
  belowBubbleSlot?: React.ReactNode;
};

const ChatBubble: React.FC<React.PropsWithChildren<ChatBubbleProps>> = ({
  children,
  timestamp,
  align,
  status,
  isLastInGroupedMessages,
  aboveBubbleSlot,
  belowBubbleSlot,
}) => {
  align = align || "stretch";

  return (
    <div
      className={clsx("chat-bubble-container max-w-[85%]", {
        "self-start": align === "left",
        "self-end": align === "right",
        "mb-2": !!isLastInGroupedMessages,
        "last-in-group": !!isLastInGroupedMessages,
      })}
    >
      {aboveBubbleSlot}

      <div
        className={clsx(
          "relative rounded-xl px-2.5 py-1.5 flex flex-row place-content-between gap-2 shadow-sm",
          `chat-bubble chat-bubble-${align}`,
          {
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

      {belowBubbleSlot}
    </div>
  );
};

export default memo(ChatBubble);
