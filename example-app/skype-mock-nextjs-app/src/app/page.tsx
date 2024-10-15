"use client";

import ChatsNavigator from "@/components/ChatsNavigator";
import NoChatSelected from "@/components/NoChatSelected";
import { RawChatData, ChatViewModel, timestampToRelativeTime } from "@/types";
import { useEffect, useState } from "react";
import { Chat, ChatMessage } from "react-chat-components";
import { convertToChatMessage } from "./utils/raw-data-to-rcc.converter";

const loggedInUserId = "1";

export default function Home() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<ChatViewModel[]>([]);

  const activeChat = chatList.find((c) => c.id === activeChatId);

  useEffect(() => {
    fetch("/api/chats").then((res) => {
      res.json().then((data: RawChatData[]) => {
        const chatViewModels = data
          .map((chatData) => ({
            ...chatData,
            lastMessageTimestamp: timestampToRelativeTime(
              chatData.lastMessageTimestamp
            ),
            // TODO: make this conversion reactive
            messages: chatData.messages.map((messageData) =>
              convertToChatMessage(messageData, loggedInUserId, chatData)
            ),
          }))
          .map((chatData) => chatData as ChatViewModel);

        setChatList(chatViewModels);
      });
    });
  }, []);

  function handleSendMessage(message: ChatMessage) {
    if (!activeChat) {
      return;
    }

    message.status = undefined;

    const newActiveChat: ChatViewModel = {
      ...activeChat,
      messages: [...(activeChat.messages as ChatViewModel[]), message],
    };

    setChatList((prev) =>
      prev.map((c) => (c.id === activeChatId ? newActiveChat : c))
    );
  }

  return (
    <div className="h-full flex flex-row">
      <div className="flex-none">
        <ChatsNavigator
          chats={chatList}
          onSelectChat={(c) => setActiveChatId(c.id)}
        />
      </div>

      <div className="flex-1 shadow-[rgba(0,0,15,0.2)_-1px_0px_5px_0px]">
        {activeChat ? (
          <Chat
            chatTitle={activeChat.contact.name}
            chatSubtitle="Last seen 3 days ago"
            messages={activeChat.messages}
            profilePhotoUrl={activeChat.contact.profilePhotoUrl}
            onSend={(message) => {
              handleSendMessage(message);
            }}
            hideNavBarBackButton={true}
            hideAddAttachmentsButton={true}
          />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
}
