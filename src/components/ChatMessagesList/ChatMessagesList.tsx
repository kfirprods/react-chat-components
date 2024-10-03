import clsx from "clsx";
import styles from "./ChatMessagesList.module.css";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import { ChatMessage } from "../../types";

export type ChatMessagesListProps = {
  messages: ChatMessage[];
  onScrolledUpChange?: (isScrolledUp: boolean) => void;
  scrolledUpThreshold?: number;
};

export type ChatMessagesListHandle = {
  scrollToBottom: (smooth?: boolean) => void;
};

const DEFAULT_SCROLLED_UP_THRESHOLD = 100;

const ChatMessagesList: React.ForwardRefRenderFunction<
  ChatMessagesListHandle,
  ChatMessagesListProps
> = ({ messages, onScrolledUpChange, scrolledUpThreshold }, ref) => {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
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

  useEffect(() => {
    onScrolledUpChange?.(isScrolledUp);
  }, [isScrolledUp, onScrolledUpChange]);

  function handleScroll() {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      setIsScrolledUp(
        scrollTop <
          scrollHeight -
            clientHeight -
            (scrolledUpThreshold || DEFAULT_SCROLLED_UP_THRESHOLD)
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={clsx(
        "h-full flex-1 flex flex-col gap-1 px-1 py-2 overflow-auto text-slate-200 font-normal",
        styles["chat-messages-list"]
      )}
      onScroll={handleScroll}
    >
      {messages.map((message) =>
        message.customRender ? (
          <div key={message.id}>{message.customRender}</div>
        ) : (
          <ChatBubble
            key={message.id}
            timestamp={message.timestamp}
            status={message.status}
            align={message.alignment}
            isLastInGroupedMessages={message.isLastInGroup}
          >
            <p>{message.textualContent}</p>
          </ChatBubble>
        )
      )}
    </div>
  );
};

export default memo(forwardRef(ChatMessagesList));
