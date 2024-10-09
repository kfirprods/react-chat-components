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
import { ChatMessage, MessageAttachment } from "../../types";
import MessageContent from "../MessageContent/MessageContent";

export type ChatMessagesListProps = {
  messages: ChatMessage[];
  scrolledUpThreshold?: number;

  onScrolledUpChange?: (isScrolledUp: boolean) => void;
  onAttachmentClick?: (
    attachment: MessageAttachment,
    message: ChatMessage
  ) => void;
};

export type ChatMessagesListHandle = {
  scrollToBottom: (smooth?: boolean) => void;
};

const DEFAULT_SCROLLED_UP_THRESHOLD = 100;

const ChatMessagesList: React.ForwardRefRenderFunction<
  ChatMessagesListHandle,
  ChatMessagesListProps
> = (
  { messages, scrolledUpThreshold, onScrolledUpChange, onAttachmentClick },
  ref
) => {
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
        "h-full flex-1 flex flex-col gap-1 px-2.5 py-2 overflow-auto font-normal",
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
            <MessageContent
              message={message}
              onAttachmentClick={(attachment, message) =>
                onAttachmentClick?.(attachment, message)
              }
            />
          </ChatBubble>
        )
      )}
    </div>
  );
};

export default memo(forwardRef(ChatMessagesList));
