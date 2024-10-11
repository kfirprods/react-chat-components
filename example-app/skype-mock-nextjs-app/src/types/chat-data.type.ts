import { ContactData } from "./contact-data.type";
import { MessageData } from "./message-data.type";
import { ChatMessage } from "react-chat-components";

export type BaseChatData = {
  id: string;
  contact: ContactData;
  previewText: string;
  lastMessageTimestamp: string;
};

export type RawChatData = BaseChatData & {
  messages: MessageData[];
};

export type ChatViewModel = BaseChatData & {
  messages: ChatMessage[];
};
