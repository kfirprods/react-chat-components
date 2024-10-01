import type { Meta, StoryObj } from "@storybook/react";

import { ChatMessageStatus, ChatPreview } from "../";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Chat/ChatPreview",
  component: ChatPreview,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
    backgrounds: {
      values: [{ name: "black", value: "#333" }],
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
