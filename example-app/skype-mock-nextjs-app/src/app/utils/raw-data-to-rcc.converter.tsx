import { ChatMessage, ChatMessageStatus } from "react-chat-components";
import { MessageData, RawChatData, RawMessageStatus } from "@/types";
import clsx from "clsx";

export function convertToChatMessage(
  messageData: MessageData,
  forUserId: string,
  context: RawChatData
): ChatMessage {
  const sentByLoggedInUser = messageData.senderId === forUserId;
  const senderName = !sentByLoggedInUser ? context.contact.name : "";
  const subtitleAboveBubble =
    (senderName ? `${senderName}, ` : "") +
    timestampToLocalizedHour(messageData.timestamp);

  return {
    ...messageData,

    // hide timestamp and status from RCC because we'll render these ourselves
    timestamp: undefined,
    status: undefined,

    // align right if the message was sent by the logged-in user (left otherwise)
    alignment: messageData.senderId === forUserId ? "right" : "left",

    // render the timestamp and the sender's name
    slotAboveBubble: (
      <div
        className={clsx("text-xs text-gray-400", {
          "text-end": sentByLoggedInUser,
        })}
      >
        {subtitleAboveBubble}
      </div>
    ),

    slotBelowBubble: sentByLoggedInUser &&
      messageData.status === RawMessageStatus.SEEN && (
        <div
          className={clsx("text-xs text-gray-400", {
            "text-end": sentByLoggedInUser,
          })}
        >
          Seen
        </div>
      ),
  };
}

function timestampToLocalizedHour(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function convertStatus(
  status: RawMessageStatus
): ChatMessageStatus | undefined {
  switch (status) {
    case RawMessageStatus.SENDING:
      return ChatMessageStatus.SENDING;
    case RawMessageStatus.SENT:
      return ChatMessageStatus.SENT;
    case RawMessageStatus.SEEN:
      return ChatMessageStatus.SEEN;
  }

  return undefined;
}
