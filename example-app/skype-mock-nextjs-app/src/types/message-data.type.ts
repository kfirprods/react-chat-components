import { ChatMessage } from "react-chat-components";

export type MessageData = {
  id: string;
  timestamp: string;
  textualContent?: string;
};

export function convertToChatMessage(messageData: MessageData): ChatMessage {
  return {
    ...messageData,
  };
}
