import type { Meta, StoryObj } from "@storybook/react";

import { Chat } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Chat/Chat",
  component: Chat,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    backgrounds: {
      values: [{ name: "black", value: "#333" }],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    chatTitle: { control: "text" },
  },
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    chatTitle: "John Doe",
    chatSubtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/men/94.jpg",
  },
};
