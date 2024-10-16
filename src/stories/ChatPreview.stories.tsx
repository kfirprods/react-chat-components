import type { Meta, StoryObj } from "@storybook/react";

import { ChatMessageStatus, ChatPreview } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Higher Order Components/ChatPreview",
  component: ChatPreview,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
      default: "dark",
    },
    docs: {
      description: {
        component: `
A small preview of a chat, meant to display a contact's photo and name + a preview of the last message.
\n\n
Check out the \`EXAMPLES\` section of the docs to see how it comes together.
        `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    name: { control: "text" },
  },
} satisfies Meta<typeof ChatPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    name: "Dror Shvetz",
    previewText: "Son I love you",
    status: ChatMessageStatus.SENT,
    timestamp: "10:36",
  },
};

export const StatusSeen: Story = {
  args: {
    name: "Dror Shvetz",
    previewText: "Son I love you",
    status: ChatMessageStatus.SEEN,
    timestamp: "22:57",
  },
};

export const LongTexts: Story = {
  args: {
    name: "Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror Dror",
    previewText:
      "Last message long message long message long message long message long message long message long message long message",
    status: ChatMessageStatus.RECEIVED,
    timestamp: "Yesterday",
  },
};

export const ProfilePicture: Story = {
  args: {
    name: "Kfir",
    previewText: "Wazzup?",
    profilePhotoUrl: "https://avatars.githubusercontent.com/u/12466002?v=4",
    timestamp: "Tuesday",
  },
};

export const CustomSlotBelowTimestamp: Story = {
  args: {
    name: "Boss",
    previewText: "Why won't you answer?",
    timestamp: "Yesterday",
    slotBelowTimestamp: (
      <div className="inline-flex flex-row items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z" />
          <path
            fillRule="evenodd"
            d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
            clipRule="evenodd"
          />
        </svg>

        <span className="inline-flex place-content-center rounded-full bg-green-500 text-xs font-semibold text-black leading-5 w-5 h-5">
          38
        </span>
      </div>
    ),
  },
};
