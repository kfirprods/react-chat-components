import type { Meta, StoryObj } from "@storybook/react";

import { AttachmentViewer } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Chat/AttachmentViewer",
  component: AttachmentViewer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "fullscreen",
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
    },

    docs: {
      description: {
        component: `A viewer to display when users click on an attachment in a chat message.`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof AttachmentViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    current: {
      id: "1",
      url: "https://placehold.co/600x400",
      type: "image",
    },
    onClose: () => {
      alert("Attachment viewer closed");
    },
  },
};

export const Title: Story = {
  args: {
    current: {
      id: "1",
      title: "A 300x300 image",
      url: "https://placehold.co/300x300",
      type: "image",
    },
    onClose: () => {
      alert("Attachment viewer closed");
    },
  },
};

export const WithMessageContext: Story = {
  args: {
    current: {
      id: "1",
      title: "You",
      url: "https://placehold.co/300x600",
      type: "image",
    },
    context: {
      id: "1",
      textualContent: "Message text",
      alignment: "right",
      timestamp: "19:30",
    },
    onClose: () => {
      alert("Attachment viewer closed");
    },
  },
};
