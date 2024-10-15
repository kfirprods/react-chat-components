import type { Meta, StoryObj } from "@storybook/react";

import { Chat, ChatMessage, ChatMessageStatus } from "..";
import { useCallback, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Higher Order Components/Chat",
  component: Chat,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
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

    const handleSend = useCallback((message: ChatMessage) => {
      setMessages((prevMessages) => {
        if (
          prevMessages[prevMessages.length - 1].alignment === message.alignment
        ) {
          prevMessages[prevMessages.length - 1].isLastInGroup = false;
        }
        message.isLastInGroup = true;
        message.timestamp = new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        });
        return [...prevMessages, message];
      });

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
    }, []);

    return (
      <div style={{ height: "100%", background: "#1F1F1F" }}>
        <Chat {...args} messages={messages} onSend={handleSend} />
      </div>
    );
  },

  args: {
    chatTitle: "Wife",
    chatSubtitle: "Active now",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    onClose: () => {},
    messages: [
      {
        id: "initial",
        customRender: (
          <p className="text-center mb-3">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              CONVERSATION STARTED
            </span>
          </p>
        ),
      },
      {
        id: "greeting",
        textualContent: "Dear John, please Johnny please come home...",
        timestamp: new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        alignment: "left",
      },
      {
        id: "image-attachment",
        textualContent: "The letter",
        timestamp: new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        alignment: "left",
        attachments: [
          {
            id: "asdf",
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCEqzBcxYVecAOhdC7nmyBTzVcBCbxrLpog&s",
            title: "Wife",
          },
        ],
        isLastInGroup: true,
      },
    ],
    onSend: () => {},
  },
};

export const NoInput: Story = {
  render: (args) => {
    return (
      <div className="h-full flex flex-col" style={{ background: "#1F1F1F" }}>
        <Chat {...args} />

        <div className="text-xs font-semibold bg-zinc-600 text-zinc-200 px-5 py-2 text-center">
          You can't send messages in this chat because you blocked this contact
        </div>
      </div>
    );
  },

  args: {
    hideChatInput: true,
    chatTitle: "Wife",
    chatSubtitle: "Last seen yesterday",
    onSend: () => {},
    onClose: () => {},
    messages: [
      {
        id: "initial",
        customRender: (
          <p className="text-center mb-3">
            <span className="inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-slate-200 ring-1 ring-inset ring-zinc-600/40">
              Yesterday
            </span>
          </p>
        ),
      },
      {
        id: "greeting",
        textualContent: "Dear John, please Johnny please come home...",
        timestamp: "10:00 AM",
        alignment: "left",
        isLastInGroup: true,
      },
      {
        id: "initial",
        customRender: (
          <p className="text-center mb-3">
            <span className="inline-flex items-center rounded-md bg-red-800 px-2 py-1 text-xs font-medium text-slate-200 ring-1 ring-inset ring-red-600/50">
              You have blocked this contact
            </span>
          </p>
        ),
      },
    ],
  },
};
