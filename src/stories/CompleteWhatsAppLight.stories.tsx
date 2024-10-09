import { Transition } from "@headlessui/react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Chat,
  ChatHandle,
  ChatMessage,
  ChatMessageStatus,
  ChatPreview,
} from "..";
import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import styles from "./CompleteExamples.module.css";
import withThemeOverride from "../decorators/theme-override";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Examples/WhatsApp (iOS, Light)",
  component: Chat,
  decorators: [
    withThemeOverride({
      "strongest-color": "white",
      "text-color": "black",
      "subtext-color": "#474b52",
      "elevated-bg-color": "#F4F4F4",
      "elevated-bg-border-color": "#E0E0E0",
      "input-bg-color": "white",
      "chat-input-border-color": "#DBDBDB",
      "chat-bubble-bg-color": "white",
      "default-chat-bubble-right-bg-color": "#CFFDCF",
      "attachments-menu-item-hover-bg-color": "#E0E0E0",
      "attachments-menu-container-bg-color": "#F4F4F4",
      "attachments-menu-container-border-color": "#E0E0E0",
    }),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    backgrounds: {
      values: [{ name: "dark", value: "#333" }],
    },

    docs: {
      description: {
        component: `An example that demonstrates how to build a mock of the WhatsApp interface, inspired by its iOS light mode. We achieve this by overriding approx. 10 CSS variables that affect colors, leaving everything else in place.`,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WhatsAppLight: Story = {
  name: "WhatsApp (iOS, Light)",
  render: (args) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(args.messages);
    const chatRef = useRef<ChatHandle>(null);

    useEffect(() => {
      if (isChatOpen) {
        setTimeout(() => {
          chatRef.current?.focusChatInput();
        }, 301);
      }
    }, [isChatOpen]);

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
      <div
        className="h-full relative overflow-hidden"
        style={{ background: "#FFF" }}
      >
        <Transition show={isChatOpen}>
          <div
            className={clsx(
              "h-full absolute top-0 left-0 right-0 bottom-0 z-10 ease-in duration-300",
              "data-[closed]:translate-x-full",
              "data-[enter]:translate-x-full",
              "data-[leave]:duration-200",
              styles["chat-container-light"]
            )}
          >
            <Chat
              ref={chatRef}
              {...args}
              messages={messages}
              onSend={handleSend}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        </Transition>

        <div className="flex flex-col px-4">
          <h2 className="text-2xl font-bold my-2">Chats</h2>

          <button
            className="py-2"
            onClick={() => setIsChatOpen(true)}
            style={
              {
                // override the color of this specific ChatPreview instance's timestamp
                "--chat-preview-timestamp-color": "rgb(34, 197, 94)",
              } as React.CSSProperties
            }
          >
            <ChatPreview
              name="Wife"
              previewText="Dear John, please Johnny please come home..."
              timestamp="07:53 PM"
              profilePhotoUrl="https://randomuser.me/api/portraits/women/10.jpg"
              slotBelowTimestamp={
                <span className="inline-flex place-content-center rounded-full bg-green-500 text-xs font-semibold text-white leading-5 w-5 h-5">
                  1
                </span>
              }
            />
          </button>

          <div className="py-2 border-t border-zinc-100">
            <ChatPreview
              name="Drake"
              previewText="Don't forget to feed the horses and clean up the barn. I'll be home late."
              timestamp="06:50 PM"
              profilePhotoUrl="https://randomuser.me/api/portraits/men/93.jpg"
              status={ChatMessageStatus.SEEN}
            />
          </div>
        </div>
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
