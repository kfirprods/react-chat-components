"use client";

import { Chat } from "react-chat-components";

export default function Home() {
  return (
    <div className="h-full flex flex-row">
      <div className="flex-none">Chats</div>

      <div className="flex-1">
        <Chat
          chatTitle="A"
          chatSubtitle="B"
          messages={[]}
          onSend={() => {}}
          hideNavBarBackButton={true}
        />
      </div>
    </div>
  );
}
