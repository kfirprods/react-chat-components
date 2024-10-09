"use client";

import { v4 as uuidv4 } from "uuid";
import ChatNavBar from "../ChatNavBar/ChatNavBar";
import ChatMessagesList, {
  ChatMessagesListHandle,
} from "../ChatMessagesList/ChatMessagesList";
import ChatInput, { ChatInputHandle } from "../ChatInput/ChatInput";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ChatMessage, ChatMessageStatus, MessageAttachment } from "../../types";
import AttachmentViewer from "../AttachmentViewer/AttachmentViewer";
import clsx from "clsx";
import styles from "./Chat.module.css";
import { CSSTransition } from "react-transition-group";
import AddAttachmentsMenu from "../AddAttachmentsMenu/AddAttachmentsMenu";
import ChevronDownIcon from "../svg-icons/ChevronDownIcon";

export type ChatProps = {
  chatTitle: string;
  messages: ChatMessage[];
  onSend: (message: ChatMessage) => void;
  onClose: () => void;
  chatSubtitle?: string;
  profilePhotoUrl?: string;
  disableChatInput?: boolean;
  hideChatInput?: boolean;
};

export type ChatHandle = {
  scrollToBottom: (smooth?: boolean) => void;
  focusChatInput: () => void;
};

const Chat: React.ForwardRefRenderFunction<ChatHandle, ChatProps> = (
  {
    chatTitle,
    chatSubtitle,
    profilePhotoUrl,
    disableChatInput,
    hideChatInput,
    messages,
    onSend,
    onClose,
  },
  ref
) => {
  const [currentOpenAttachment, setCurrentOpenAttachment] = useState<{
    message: ChatMessage;
    attachment: MessageAttachment;
  } | null>(null);
  const [isAttachmentsMenuOpen, setIsAttachmentsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const attachmentsButtonRef = useRef<HTMLButtonElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const chatMessagesListRef = useRef<ChatMessagesListHandle>(null);
  const chatInputRef = useRef<ChatInputHandle>(null);
  const lastKnownMessagesLength = useRef(messages.length);

  const toggleAttachmentsMenu = useCallback(() => {
    setIsAttachmentsMenuOpen((isOpen) => !isOpen);
  }, []);

  useEffect(() => {
    chatMessagesListRef.current?.scrollToBottom(false);
  }, []);

  useEffect(() => {
    if (!isScrolledUp && messages.length > lastKnownMessagesLength.current) {
      chatMessagesListRef.current?.scrollToBottom(true);
    }

    lastKnownMessagesLength.current = messages.length;
  }, [messages, isScrolledUp]);

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      chatMessagesListRef.current?.scrollToBottom(true);
    },

    focusChatInput: () => {
      chatInputRef.current?.focus();
    },
  }));

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

  const handleAttachmentFilesSelected = useCallback(
    (files: File[]) => {
      onSend({
        id: uuidv4(),
        alignment: "right",
        status: ChatMessageStatus.SENDING,
        attachments: files.map((file) => ({
          id: uuidv4(),
          url: URL.createObjectURL(file),
          type: file.type.split("/")[0] as MessageAttachment["type"],
          title: file.name,
        })),
      });
    },
    [onSend]
  );

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
        timeout={{
          enter: 300,
          exit: 100,
        }}
        unmountOnExit
        classNames={{
          enter: styles["menu-enter"],
          enterActive: styles["menu-enter-active"],
          exit: styles["menu-exit"],
          exitActive: styles["menu-exit-active"],
        }}
        nodeRef={menuRef}
      >
        <div
          ref={menuRef}
          className={clsx(
            "attachments-menu-container absolute max-w-80 px-2 py-3 border origin-bottom-left rounded-xl flex flex-col whitespace-nowrap",
            styles["attachment-menu"]
          )}
        >
          <AddAttachmentsMenu onSelect={handleAttachmentFilesSelected} />
        </div>
      </CSSTransition>

      <button
        ref={attachmentsButtonRef}
        onClick={toggleAttachmentsMenu}
        className={clsx(
          "input-add-attachments-button flex place-items-center place-content-center w-7 h-7 transition-all origin-center rounded-full",
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
        onClose={onClose}
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
            className="scroll-to-bottom-button absolute bottom-4 right-0 rounded-l-lg w-11 h-8 flex place-items-center place-content-center ring-1 ring-zinc-400/20"
            onClick={() => chatMessagesListRef.current?.scrollToBottom(true)}
          >
            <div className="w-5 h-5">
              <ChevronDownIcon />
            </div>
          </button>
        )}
      </div>

      {!hideChatInput && (
        <ChatInput
          ref={chatInputRef}
          onSend={handleSend}
          leftSlot={addAttachmentButton}
          disabled={disableChatInput}
        />
      )}
    </div>
  );
};

export default forwardRef(Chat);
