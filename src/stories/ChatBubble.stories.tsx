import type { Meta, StoryObj } from "@storybook/react";

import { ChatBubble, ChatMessageStatus } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Lower Order Components/ChatBubble",
  component: ChatBubble,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "fullscreen",
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
    },

    docs: {
      description: {
        component: `A basic text input component paired with a "Send" button. Additional functionality can be injected via left and right slots.`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    children: "You can render anything here",
  },
};

export const Timestamp: Story = {
  args: {
    children: "You can render anything here",
    timestamp: "12:34 PM",
  },
};

export const Status: Story = {
  args: {
    children: "You can render anything here",
    timestamp: "12:34 PM",
    status: ChatMessageStatus.SEEN,
  },
};

export const LongText: Story = {
  args: {
    children:
      "It is preferable to use the <MessageContent /> component to render supported content. For example, if you use it to render text, it will guarantee that the timestamp and the text will never touch.",
    timestamp: "12:34 PM",
  },
};

export const AlignRight: Story = {
  render: (args) => (
    <div className="flex flex-col">
      <ChatBubble {...args} />
    </div>
  ),

  args: {
    children: "The bubble aligns itself to flex-end",
    align: "right",
  },
};

export const SlotAboveBubble: Story = {
  args: {
    children: "Some text. Lalalala...",
    timestamp: "12:34 PM",
    aboveBubbleSlot: (
      <div className="text-xs text-gray-500 px-1">
        Render anything above the bubble
      </div>
    ),
  },
};

export const SlotBelowBubble: Story = {
  args: {
    children: "Some text. Lalalala...",
    timestamp: "12:34 PM",
    belowBubbleSlot: (
      <div className="text-xs text-gray-500 px-1">
        Render anything below the bubble
      </div>
    ),
  },
};
