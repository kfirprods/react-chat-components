import clsx from "clsx";
import React from "react";
import PaperPlaneIcon from "../svg-icons/PaperPlaneIcon";

export type ChatInputProps = {
  onSend: (text: string) => void;

  placeholder?: string;
  defaultValue?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder,
  defaultValue,
  leftSlot,
  rightSlot,
  disabled,
}) => {
  const [text, setText] = React.useState(defaultValue || "");

  const sendButton = (
    <button
      title="Send"
      onClick={send}
      disabled={text.length === 0 || disabled}
      className={clsx(
        "h-8 rounded-full aspect-square w-8 flex place-items-center place-content-center p-2",
        {
          "bg-green-500": text.length > 0,
          "bg-zinc-500": text.length === 0,
          "text-zinc-700": text.length === 0,
        }
      )}
    >
      <PaperPlaneIcon />
    </button>
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && text.length > 0) {
      send();
    }
  }

  function send() {
    if (text.length === 0) {
      return;
    }

    onSend(text);
    setText("");
  }

  return (
    <div className="bg-zinc-800 flex flex-row place-items-center px-2 py-1 gap-1 border-t border-zinc-700 min-h-11">
      {leftSlot}

      <input
        className="bg-zinc-600 text-slate-50 flex-1 rounded-2xl px-3 py-1 focus:outline-none text-sm"
        type="text"
        placeholder={placeholder}
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {(!text && rightSlot) || sendButton}
    </div>
  );
};

export default ChatInput;
