import clsx from "clsx";
import { ChatMessageStatus } from "../../types";

export default function MessageStatusIcon({
  status,
}: {
  status: ChatMessageStatus;
}) {
  const shouldDoubleTick =
    status === ChatMessageStatus.RECEIVED || status === ChatMessageStatus.SEEN;

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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="m4.5 12.75 6 6 9-13.5"
      />

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
