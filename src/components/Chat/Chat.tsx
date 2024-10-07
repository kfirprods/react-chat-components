import { v4 as uuidv4 } from "uuid";
import ChatNavBar from "../ChatNavBar/ChatNavBar";
import ChatMessagesList, {
  ChatMessagesListHandle,
} from "../ChatMessagesList/ChatMessagesList";
import ChatInput from "../ChatInput/ChatInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage, ChatMessageStatus, MessageAttachment } from "../../types";
import AttachmentViewer from "../AttachmentViewer/AttachmentViewer";
import clsx from "clsx";
import styles from "./Chat.module.css";
import { CSSTransition } from "react-transition-group";
import MenuItem from "../MenuItem/MenuItem";

export type ChatProps = {
  chatTitle: string;
  messages: ChatMessage[];
  onSend: (message: ChatMessage) => void;
  chatSubtitle?: string;
  profilePhotoUrl?: string;
  disableChatInput?: boolean;
  hideChatInput?: boolean;
};

const Chat: React.FC<ChatProps> = ({
  chatTitle,
  chatSubtitle,
  profilePhotoUrl,
  disableChatInput,
  hideChatInput,
  messages,
  onSend,
}) => {
  const [currentOpenAttachment, setCurrentOpenAttachment] = useState<{
    message: ChatMessage;
    attachment: MessageAttachment;
  } | null>(null);
  const [isAttachmentsMenuOpen, setIsAttachmentsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const attachmentsButtonRef = useRef<HTMLButtonElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const chatMessagesListRef = useRef<ChatMessagesListHandle>(null);
  const lastKnownMessagesLength = useRef(messages.length);

  const toggleAttachmentsMenu = useCallback(() => {
    setIsAttachmentsMenuOpen((isOpen) => !isOpen);
  }, []);

  useEffect(() => {
    if (!isScrolledUp && messages.length > lastKnownMessagesLength.current) {
      chatMessagesListRef.current?.scrollToBottom(true);
    }

    lastKnownMessagesLength.current = messages.length;
  }, [messages, isScrolledUp]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      attachmentsButtonRef.current &&
      !attachmentsButtonRef.current.contains(event.target as Node)
    ) {
      setIsAttachmentsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isAttachmentsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAttachmentsMenuOpen, handleClickOutside]);

  function handleSend(text: string) {
    onSend({
      id: uuidv4(),
      textualContent: text,
      alignment: "right",
      status: ChatMessageStatus.SENDING,
    });
  }

  const handleScrolledUpChange = useCallback((isScrolledUp: boolean) => {
    setIsScrolledUp(isScrolledUp);
  }, []);

  const handleAttachmentClicked = useCallback(
    (attachment: MessageAttachment, message: ChatMessage) => {
      setCurrentOpenAttachment({
        attachment,
        message,
      });
    },
    []
  );

  const addAttachmentButton = (
    <div className="relative">
      <CSSTransition
        in={isAttachmentsMenuOpen}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: styles["menu-enter"],
          enterActive: styles["menu-enter-active"],
          exit: styles["menu-exit"],
          exitActive: styles["menu-exit-active"],
        }}
      >
        <div
          ref={menuRef}
          className={clsx(
            "absolute max-w-80 px-2 py-3 bg-zinc-700 origin-bottom-left rounded-xl text-zinc-300 flex flex-col whitespace-nowrap",
            styles["attachment-menu"]
          )}
        >
          <MenuItem text="Documents" onClick={() => {}} />
          <MenuItem text="Photos & Videos" onClick={() => {}} />
        </div>
      </CSSTransition>

      <button
        ref={attachmentsButtonRef}
        onClick={toggleAttachmentsMenu}
        className={clsx(
          "flex place-items-center place-content-center w-7 h-7 text-slate-200 transition-all origin-center rounded-full",
          {
            "bg-zinc-400/60": isAttachmentsMenuOpen,
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 26 24"
          strokeWidth={2}
          stroke="currentColor"
          className={clsx("size-6 transition-all duration-300", {
            [styles["rotated-x"]]: isAttachmentsMenuOpen,
          })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );

  const chevronDownIcon = (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M830.3616 881.5616C922.2144 789.7088 972.8 667.5456 972.8 537.6s-50.5856-252.0576-142.4384-343.9104-214.016-142.4384-343.9616-142.4384-252.0576 50.5856-343.9616 142.4384S0 407.7056 0 537.6s50.5856 252.0576 142.4384 343.9616S356.4544 1024 486.4 1024s252.0576-50.5856 343.9616-142.4384zM51.2 537.6C51.2 297.6256 246.4256 102.4 486.4 102.4S921.6 297.6256 921.6 537.6c0 239.9744-195.2256 435.2-435.2 435.2S51.2 777.5744 51.2 537.6z"
        fill="white"
        strokeWidth={2}
      />
      <path
        d="M204.8 460.8a25.6 25.6 0 0 1 43.6736-18.1248l237.8752 237.8752 237.8752-237.8752a25.6 25.6 0 0 1 36.1984 36.1984l-256 256a25.6 25.6 0 0 1-36.1984 0l-256-256a25.4976 25.4976 0 0 1-7.4752-18.1248z"
        fill="white"
        strokeWidth={10}
      />
    </svg>
  );

  return (
    <div className="flex flex-col h-full relative">
      {currentOpenAttachment && (
        <AttachmentViewer
          current={currentOpenAttachment.attachment}
          context={currentOpenAttachment.message}
          onClose={() => setCurrentOpenAttachment(null)}
        />
      )}

      <ChatNavBar
        title={chatTitle}
        subtitle={chatSubtitle}
        profilePhotoUrl={profilePhotoUrl}
      />

      <div className="relative flex-1 flex flex-col min-h-0">
        <ChatMessagesList
          ref={chatMessagesListRef}
          messages={messages}
          onScrolledUpChange={handleScrolledUpChange}
          onAttachmentClick={handleAttachmentClicked}
        />

        {isScrolledUp && (
          <button
            className="absolute bottom-4 right-0 bg-zinc-800 rounded-l-lg w-11 h-8 flex place-items-center place-content-center"
            onClick={() => chatMessagesListRef.current?.scrollToBottom(true)}
          >
            <div className="w-5 h-5">{chevronDownIcon}</div>
          </button>
        )}
      </div>

      {!hideChatInput && (
        <ChatInput
          onSend={handleSend}
          leftSlot={addAttachmentButton}
          disabled={disableChatInput}
        />
      )}
    </div>
  );
};

export default Chat;
