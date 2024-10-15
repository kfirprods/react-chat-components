import { ChatMessageStatus } from "./chat-message-status.enum";
import { MessageAttachment } from "./message-attachment.type";

export type ChatMessage = {
  id: string;

  status?: ChatMessageStatus;
  timestamp?: string;
  alignment?: "left" | "right" | "stretch";
  isLastInGroup?: boolean;

  textualContent?: string;
  attachments?: MessageAttachment[];

  // render something *instead* of a chat bubble
  customRender?: React.ReactNode;

  // slots for content above and below a chat bubble
  slotAboveBubble?: React.ReactNode;
  slotBelowBubble?: React.ReactNode;
};
