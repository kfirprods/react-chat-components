"use client";

import ChatsNavigator from "@/components/ChatsNavigator";
import NoChatSelected from "@/components/NoChatSelected";
import { ChatData } from "@/types";
import { useState } from "react";
import { Chat } from "react-chat-components";

export default function Home() {
  const [activeChat, setActiveChat] = useState<ChatData | null>(null);
  const chatList: ChatData[] = [];

  return (
    <div className="h-full flex flex-row">
      <div className="flex-none">
        <ChatsNavigator
          chats={chatList}
          onSelectChat={(c) => setActiveChat(c)}
        />
      </div>

      <div className="flex-1 shadow-[rgba(0,0,15,0.2)_-1px_0px_5px_0px]">
        {activeChat ? (
          <Chat
            chatTitle={activeChat.contact.name}
            chatSubtitle="Last seen 3 days ago"
            messages={activeChat.messages}
            onSend={() => {}}
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
