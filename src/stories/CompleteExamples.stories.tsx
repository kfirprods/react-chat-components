import type { Meta, StoryObj } from "@storybook/react";
import { Chat, ChatMessage, ChatMessageStatus, ChatPreview } from "..";
import { useCallback, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Examples/Full",
  component: Chat,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "fullscreen",
    backgrounds: {
      values: [{ name: "black", value: "#333" }],
    },

    docs: {
      description: {
        component: `Example`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WhatsApp: Story = {
  render: (args) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
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
        {isChatOpen && (
          <Chat
            {...args}
            messages={messages}
            onSend={handleSend}
            onClose={() => setIsChatOpen(false)}
          />
        )}

        {!isChatOpen && (
          <div className="flex flex-col px-2">
            <button className="py-2" onClick={() => setIsChatOpen(true)}>
              <ChatPreview
                name="Wife"
                previewText="Dear John, please Johnny please come home..."
                timestamp="07:53 PM"
                profilePhotoUrl="https://randomuser.me/api/portraits/women/10.jpg"
              />
            </button>

            <div className="py-2 border-t border-zinc-800">
              <ChatPreview
                name="Roommate"
                previewText="Don't forget to pick up the groceries on the way home, remember the list I sent you last night!"
                timestamp="06:50 PM"
                profilePhotoUrl="https://randomuser.me/api/portraits/men/93.jpg"
              />
            </div>
          </div>
        )}
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
        isLastInGroup: true,
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
      },
    ],
    onSend: () => {},
  },
};
