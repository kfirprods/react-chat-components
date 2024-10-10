// "use client";

import clsx from "clsx";
import React, { forwardRef, useImperativeHandle } from "react";
import PaperPlaneIcon from "../svg-icons/PaperPlaneIcon";

export type ChatInputProps = {
  onSend: (text: string) => void;

  placeholder?: string;
  defaultValue?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  disabled?: boolean;
};

export type ChatInputHandle = {
  focus: () => void;
};

const ChatInput: React.ForwardRefRenderFunction<
  ChatInputHandle,
  ChatInputProps
> = (
  { onSend, placeholder, defaultValue, leftSlot, rightSlot, disabled },
  ref
) => {
  const [text, setText] = React.useState(defaultValue || "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus({ preventScroll: true });
      },
    }),
    []
  );

  const sendButton = (
    <button
      title="Send"
      onClick={send}
      disabled={text.length === 0 || disabled}
      className={clsx(
        "chat-input-send-button h-8 rounded-full aspect-square w-8 flex place-items-center place-content-center p-2",
        {
          "send-button-enabled": text.length > 0,
          "bg-zinc-500": text.length === 0,
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
    <div className="chat-input-container flex flex-row place-items-center px-2 py-1 gap-1 border-t min-h-11">
      {leftSlot}

      <input
        ref={inputRef}
        className="actual-input flex-1 rounded-2xl px-3 py-1 focus:outline-none text-sm border"
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

export default forwardRef(ChatInput);
