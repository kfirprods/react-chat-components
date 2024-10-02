import clsx from "clsx";
import { ChatMessageStatus } from "../../types";

export default function MessageStatusIcon({
  status,
}: {
  status: ChatMessageStatus;
}) {
  const shouldRenderTick =
    status !== ChatMessageStatus.SENDING && status !== ChatMessageStatus.FAILED;
  const shouldDoubleTick =
    shouldRenderTick &&
    (status === ChatMessageStatus.RECEIVED ||
      status === ChatMessageStatus.SEEN);

  const clockIcon = (
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
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 20"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx("size-4 inline", {
        "text-blue-500": status === ChatMessageStatus.SEEN,
      })}
    >
      {status === ChatMessageStatus.SENDING && clockIcon}

      {shouldRenderTick && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="m4.5 12.75 6 6 9-13.5"
        />
      )}

      {shouldDoubleTick && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="m15 15.75 3 3 9-13.5"
        />
      )}
    </svg>
  );
}
