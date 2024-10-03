import { ChatMessageStatus } from "./chat-message-status.enum";

export type ChatMessage = {
  id: string;

  status?: ChatMessageStatus;
  timestamp?: string;
  textualContent?: string;
  alignment?: "left" | "right" | "stretch";
  customRender?: React.ReactNode;
  isLastInGroup?: boolean;
};
