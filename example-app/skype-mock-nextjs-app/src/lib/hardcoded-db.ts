import { RawChatData, ContactData } from "@/types";

export const CONTACTS: ContactData[] = [
  {
    id: "1",
    name: "The User",
  },
  {
    id: "2",
    name: "GamerDad532",
    profilePhotoUrl: "https://randomuser.me/api/portraits/men/93.jpg",
  },
  {
    id: "3",
    name: "Jane Doe",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/14.jpg",
  },
];

export const LOGGED_IN_USER = CONTACTS[0];

export const CHATS: RawChatData[] = [
  {
    id: "1",
    contact: CONTACTS[1],
    messages: [
      {
        id: "1",
        textualContent: "Hey, how's it going?",
        timestamp: "2024-09-01T12:00:00Z",
        senderId: CONTACTS[1].id,
      },
    ],
    lastMessageTimestamp: "2024-09-01T12:00:00Z",
    previewText: "Hey, how's it going?",
  },
  {
    id: "2",
    contact: CONTACTS[2],
    messages: [
      {
        id: "1",
        textualContent: "Who are you?",
        timestamp: "2024-10-09T12:00:00Z",
        senderId: LOGGED_IN_USER.id,
      },
    ],
    lastMessageTimestamp: "2024-10-09T12:00:00Z",
    previewText: "Who are you?",
  },
];
