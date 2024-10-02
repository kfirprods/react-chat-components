import clsx from "clsx";
import styles from "./ChatMessagesList.module.css";
import { forwardRef, useImperativeHandle, useRef } from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import { ChatMessage } from "../../types";

export type ChatMessagesListProps = {
  messages: ChatMessage[];
};

export type ChatMessagesListHandle = {
  scrollToBottom: (smooth?: boolean) => void;
};

const ChatMessagesList: React.ForwardRefRenderFunction<
  ChatMessagesListHandle,
  ChatMessagesListProps
> = ({ messages }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom: (smooth = false) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    },
  }));

  return (
    <div
      ref={containerRef}
      className={clsx(
        "flex-1 flex flex-col gap-1 px-1 py-2 overflow-auto text-slate-200 font-normal",
        styles["chat-messages-list"]
      )}
    >
      {messages.map((message) =>
        message.customRender ? (
          <div key={message.id}>{message.customRender}</div>
        ) : (
          <ChatBubble
            key={message.id}
            timestamp={"now"}
            status={message.status}
            align={"right"}
          >
            <p>{message.textualContent}</p>
          </ChatBubble>
        )
      )}
    </div>
  );
};

export default forwardRef(ChatMessagesList);
