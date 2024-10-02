import clsx from "clsx";
import React from "react";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        />
      </svg>
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
    <div className="bg-zinc-800 flex flex-row place-items-center px-2 py-1 gap-2 border-t border-zinc-700">
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

      {rightSlot || sendButton}
    </div>
  );
};

export default ChatInput;
