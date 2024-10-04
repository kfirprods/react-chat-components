import type { Meta, StoryObj } from "@storybook/react";

import { ChatInput } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Chat/ChatInput",
  component: ChatInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "fullscreen",
    backgrounds: {
      values: [{ name: "black", value: "#333" }],
    },

    docs: {
      description: {
        component: `A basic text input component paired with a "Send" button. Additional functionality can be injected via left and right slots.`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    defaultValue: { control: "text" },
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    onSend: () => {},
  },
};

export const Disabled: Story = {
  args: {
    onSend: () => {},
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    onSend: () => {},
    placeholder: "Type a message...",
  },
};

export const LeftSlot: Story = {
  args: {
    onSend: () => {},
    leftSlot: (
      <button className="text-white" title="Emojis">
        😀
      </button>
    ),
  },
};

export const RightSlot: Story = {
  args: {
    onSend: () => {},
    rightSlot: (
      <button title="Camera" style={{ transform: "translateY(-5px)" }}>
        📷
      </button>
    ),
  },
};
