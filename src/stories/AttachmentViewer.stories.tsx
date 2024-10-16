import type { Meta, StoryObj } from "@storybook/react";

import { AttachmentViewer } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Lower Order Components/AttachmentViewer",
  component: AttachmentViewer,
  parameters: {
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
    },

    docs: {
      description: {
        component: `A viewer that can be displayed when users click an attachment in a chat message.`,
      },
      story: {
        height: "400px",
      },
      canvas: {
        sourceState: "shown",
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
  parameters: {
    docs: {
      description: {
        story:
          "Provide a `ChatMessage` object for context. Affects the alignment of the opening animation, timestamp and description.",
      },
    },
  },
};
