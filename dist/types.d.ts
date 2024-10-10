import * as react from 'react';
import react__default from 'react';

declare enum ChatMessageStatus {
    SENDING = "Sending",
    SENT = "Sent",
    RECEIVED = "Received",
    SEEN = "Seen",
    FAILED = "Failed"
}

type MessageAttachment = {
    id: string;
    url: string;
    type: "image" | "video" | "audio" | "file";
    title?: string;
};

type ChatMessage = {
    id: string;
    status?: ChatMessageStatus;
    timestamp?: string;
    alignment?: "left" | "right" | "stretch";
    customRender?: React.ReactNode;
    isLastInGroup?: boolean;
    textualContent?: string;
    attachments?: MessageAttachment[];
};

type ChatPreviewProps = {
    name: string;
    previewText: string;
    profilePhotoUrl?: string;
    status?: ChatMessageStatus;
    timestamp?: string;
    slotBelowTimestamp?: React.ReactNode;
};
declare const ChatPreview: React.FC<ChatPreviewProps>;

type ChatNavBarProps = {
    title: string;
    subtitle?: string;
    profilePhotoUrl?: string;
    hideBackButton?: boolean;
    backButtonUnreadCount?: number;
    onClose?: () => void;
    onClick?: () => void;
    rightSlot?: React.ReactNode;
};
declare const ChatNavBar: React.FC<ChatNavBarProps>;

type ChatInputProps = {
    onSend: (text: string) => void;
    placeholder?: string;
    defaultValue?: string;
    leftSlot?: react__default.ReactNode;
    rightSlot?: react__default.ReactNode;
    disabled?: boolean;
};
type ChatInputHandle = {
    focus: () => void;
};
declare const _default$2: react__default.ForwardRefExoticComponent<ChatInputProps & react__default.RefAttributes<ChatInputHandle>>;

type ChatMessagesListProps = {
    messages: ChatMessage[];
    scrolledUpThreshold?: number;
    onScrolledUpChange?: (isScrolledUp: boolean) => void;
    onAttachmentClick?: (attachment: MessageAttachment, message: ChatMessage) => void;
};
type ChatMessagesListHandle = {
    scrollToBottom: (smooth?: boolean) => void;
};
declare const _default$1: react.MemoExoticComponent<react.ForwardRefExoticComponent<ChatMessagesListProps & react.RefAttributes<ChatMessagesListHandle>>>;

type AttachmentViewerProps = {
    current: MessageAttachment;
    onClose: () => void;
    context?: ChatMessage;
};
declare const AttachmentViewer: React.FC<AttachmentViewerProps>;

type ChatProps = {
    chatTitle: string;
    messages: ChatMessage[];
    onSend: (message: ChatMessage) => void;
    hideNavBarBackButton?: boolean;
    chatSubtitle?: string;
    profilePhotoUrl?: string;
    disableChatInput?: boolean;
    hideChatInput?: boolean;
    onClose?: () => void;
};
type ChatHandle = {
    scrollToBottom: (smooth?: boolean) => void;
    focusChatInput: () => void;
};
declare const _default: react.ForwardRefExoticComponent<ChatProps & react.RefAttributes<ChatHandle>>;

export { AttachmentViewer, _default as Chat, type ChatHandle, _default$2 as ChatInput, type ChatInputHandle, type ChatMessage, ChatMessageStatus, _default$1 as ChatMessagesList, type ChatMessagesListHandle, ChatNavBar, ChatPreview, type MessageAttachment };
