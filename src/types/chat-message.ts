import { ChatMessageStatus } from "./chat-message-status.enum";
import { MessageAttachment } from "./message-attachment.type";

export type ChatMessage = {
  id: string;

  status?: ChatMessageStatus;
  timestamp?: string;
  alignment?: "left" | "right" | "stretch";
  customRender?: React.ReactNode;
  isLastInGroup?: boolean;

  textualContent?: string;
  attachments?: MessageAttachment[];
};
