import { ChatMessage } from "react-chat-components";

export type MessageData = {
  id: string;
  timestamp: string;
  textualContent?: string;
  senderId: string;
};

export function convertToChatMessage(
  messageData: MessageData,
  forUserId: string
): ChatMessage {
  return {
    ...messageData,
    timestamp: undefined,
    alignment: messageData.senderId === forUserId ? "right" : "left",
  };
}

export function timestampToRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  if (diff < 1000 * 60) {
    return "Just now";
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}m ago`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
  } else {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`;
  }
}
