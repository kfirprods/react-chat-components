import type { Meta, StoryObj } from "@storybook/react";

import { Chat, ChatMessage, ChatMessageStatus } from "..";
import { useState } from "react";

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
  render: (args) => {
    const [messages, setMessages] = useState<ChatMessage[]>(args.messages);

    const handleSend = (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Simulate message transition from sending to sent
      // TODO: randomly simulate a failure
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((prevMessage) =>
            prevMessage.id === message.id
              ? { ...prevMessage, status: ChatMessageStatus.SENT }
              : prevMessage
          )
        );

        // simulate transition from sending to received
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((prevMessage) =>
              prevMessage.id === message.id
                ? { ...prevMessage, status: ChatMessageStatus.RECEIVED }
                : prevMessage
            )
          );
        }, 700);
      }, 500);
    };

    return <Chat {...args} messages={messages} onSend={handleSend} />;
  },

  args: {
    chatTitle: "John Doe",
    chatSubtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/men/94.jpg",
    messages: [
      {
        id: "initial",
        customRender: (
          <p className="text-center">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              CONVERSATION STARTED
            </span>
          </p>
        ),
      },
    ],
    onSend: () => {},
  },
};
