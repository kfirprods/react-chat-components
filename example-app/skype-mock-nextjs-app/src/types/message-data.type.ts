import { RawMessageStatus } from "./raw-message-status.enum";

export type MessageData = {
  id: string;
  timestamp: string;
  textualContent?: string;
  senderId: string;
  status: RawMessageStatus;
};

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
