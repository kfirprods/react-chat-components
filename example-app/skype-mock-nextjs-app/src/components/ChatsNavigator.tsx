"use client";

import { ChatData } from "@/types";
import { ChatPreview, ProfilePicture } from "react-chat-components";

export type ChatsNavigatorProps = {
  chats: ChatData[];
  onSelectChat: (chat: ChatData) => void;
};

export default function ChatsNavigator({
  chats,
  onSelectChat,
}: ChatsNavigatorProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-skype-light-blue px-3 py-2 gap-2 w-80">
        <div className="flex flex-row gap-2">
          <div className="relative">
            <ProfilePicture size="lg" />

            <div className="absolute bottom-[1px] right-[1px] bg-green-500 rounded-full w-3 h-3 z-10 border border-white"></div>
          </div>

          <div className="flex flex-col text-sky-600 gap-0.5">
            <h3 className="font-semibold">Kfir</h3>
            <p className="text-xs subtext-color">Set a status</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="People, groups, messages"
          className="text-sm px-3 py-2 rounded-lg"
        />
      </div>

      <div className="flex flex-col pt-2 px-2">
        <h6 className="text-zinc-500 pl-2 text-sm font-semibold py-2 select-none">
          Recent chats
        </h6>

        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="p-2 rounded-lg hover:bg-skype-light-blue"
          >
            <ChatPreview
              name={chat.contact.name}
              previewText={chat.previewText}
              timestamp={chat.lastMessageTimestamp}
              profilePhotoUrl={chat.contact.profilePhotoUrl}
            />
          </button>
        ))}
        {/* <button className="p-2 rounded-lg hover:bg-skype-light-blue">
          <ChatPreview
            name="GamerDad788"
            previewText="Are you there?"
            timestamp="11:15 AM"
            profilePhotoUrl="https://randomuser.me/api/portraits/men/93.jpg"
          />
        </button> */}
      </div>
    </div>
  );
}
