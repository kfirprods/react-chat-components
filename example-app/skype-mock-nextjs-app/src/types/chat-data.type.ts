import { ContactData } from "./contact-data.type";
import { MessageData } from "./message-data.type";

export type ChatData = {
  id: string;
  contact: ContactData;
  previewText: string;
  lastMessageTimestamp: string;

  messages: MessageData[];
};
