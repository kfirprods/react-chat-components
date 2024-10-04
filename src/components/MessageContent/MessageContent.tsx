import clsx from "clsx";
import { ChatMessage, MessageAttachment } from "../../types";
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";

export type MessageContentProps = {
  message: ChatMessage;
  onAttachmentClick?: (
    attachment: MessageAttachment,
    message: ChatMessage
  ) => void;
};

const MessageContent: React.FC<MessageContentProps> = ({
  message,
  onAttachmentClick,
}) => {
  const simpleText = (
    <p>
      {message.textualContent}

      {/* A cool hack to reserve space for the absolute-positioned timestamp and status */}
      <span className="text-xs pr-2 opacity-0 select-none">
        {message.timestamp}

        {message.status && <MessageStatusIcon status={message.status} />}
      </span>
    </p>
  );

  if (!message.attachments?.length) {
    return simpleText;
  }

  return (
    <div className="flex flex-col max-w-60">
      <div className="flex flex-row gap-1 flex-wrap">
        {message.attachments.map((attachment) => (
          <img
            key={attachment.id}
            draggable={false}
            src={attachment.url}
            alt="Attachment"
            className={clsx("rounded-lg object-cover cursor-pointer", {
              "max-h-60 max-w-60": message.attachments!.length === 1,
              "w-28 h-28": message.attachments!.length > 1,
            })}
            onClick={() => onAttachmentClick?.(attachment, message)}
          />
        ))}
      </div>

      {simpleText}
    </div>
  );
};

export default MessageContent;
