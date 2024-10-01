import ChatNavBar from "../ChatNavBar/ChatNavBar";
import ChatMessagesList, {
  ChatMessagesListHandle,
} from "../ChatMessagesList/ChatMessagesList";
import ChatInput from "../ChatInput/ChatInput";
import { useEffect, useRef, useState } from "react";

export type ChatProps = {};

const Chat: React.FC<ChatProps> = ({}) => {
  const chatMessagesListRef = useRef<ChatMessagesListHandle>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const addAttachmentButton = (
    <button className="h-8 text-slate-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );

  useEffect(() => {
    // TODO: detect if user scrolled up to avoid auto-scroll
    chatMessagesListRef.current?.scrollToBottom(true);
  }, [messages]);

  function handleSend(text: string) {
    setMessages((prevMessages) => [...prevMessages, text]);
  }

  return (
    <div className="flex flex-col h-full">
      <ChatNavBar />

      <ChatMessagesList ref={chatMessagesListRef} messages={messages} />

      <ChatInput onSend={handleSend} leftSlot={addAttachmentButton} />
    </div>
  );
};

export default Chat;
