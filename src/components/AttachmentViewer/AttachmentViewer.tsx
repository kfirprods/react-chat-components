import { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { ChatMessage, MessageAttachment } from "../../types";
import styles from "./AttachmentViewer.module.css";

export type AttachmentViewerProps = {
  current: MessageAttachment;
  onClose: () => void;

  context?: ChatMessage;
};

const AttachmentViewer: React.FC<AttachmentViewerProps> = ({
  current,
  context,
  onClose,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [showImage, setShowImage] = useState(false);

  const handleClose = useCallback(() => {
    setShowImage(false);
  }, []);

  useEffect(() => {
    setShowImage(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const closeIcon = (
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
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 z-50 backdrop-blur-sm bg-slate-800/80 py-1 select-none">
      <div className="relative flex-none flex flex-row px-2 h-12">
        <div className="flex-1 flex flex-col place-items-center place-content-center">
          {current.title && (
            <>
              <h1 className="text-sm text-white font-semibold text-center">
                {current.title}
              </h1>

              {context?.timestamp && (
                <p className="text-xs text-slate-200 text-center">
                  {context.timestamp}
                </p>
              )}
            </>
          )}
        </div>

        <button
          className="absolute z-10 right-2 top-1 text-white text-2xl p-1.5"
          onClick={handleClose}
        >
          {closeIcon}
        </button>
      </div>

      <CSSTransition
        in={showImage}
        timeout={300}
        classNames={{
          enter: styles["growing-img-enter"],
          enterActive: styles["growing-img-enter-active"],
          exit: styles["growing-img-exit"],
          exitActive: styles["growing-img-exit-active"],
        }}
        unmountOnExit
        appear
        onExited={onClose}
        nodeRef={imgRef}
      >
        <img
          ref={imgRef}
          src={current.url}
          alt="Full size attachment"
          className={clsx("flex-1 object-contain min-h-0", {
            "origin-[0%_50%]":
              !context?.alignment || context.alignment === "left",
            "origin-[100%_50%]": context?.alignment === "right",
            "origin-center": context?.alignment === "stretch",
          })}
        />
      </CSSTransition>

      <div className="flex-none flex flex-row place-items-center place-content-center px-2 h-12">
        {context?.textualContent && (
          <p className="text-zinc-300 text-center">{context.textualContent}</p>
        )}
      </div>
    </div>
  );
};

export default AttachmentViewer;
