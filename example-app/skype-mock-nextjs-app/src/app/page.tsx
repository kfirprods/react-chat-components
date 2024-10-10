"use client";

import ChatsNavigator from "@/components/ChatsNavigator";
import { Chat } from "react-chat-components";

export default function Home() {
  return (
    <div className="h-full flex flex-row">
      <div className="flex-none">
        <ChatsNavigator />
      </div>

      <div className="flex-1 shadow-[rgba(0,0,15,0.2)_-1px_0px_5px_0px]">
        <Chat
          chatTitle="Wife"
          chatSubtitle="Active now"
          messages={[]}
          onSend={() => {}}
          hideNavBarBackButton={true}
          hideAddAttachmentsButton={true}
        />
      </div>
    </div>
  );
}
