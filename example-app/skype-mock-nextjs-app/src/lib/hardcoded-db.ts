import { ChatData, ContactData } from "@/types";

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
];

export const LOGGED_IN_USER = CONTACTS[0];

export const CHATS: ChatData[] = [
  {
    id: "1",
    contact: CONTACTS[1],
    messages: [
      {
        id: "1",
        textualContent: "Hey, how's it going?",
        timestamp: "2024-09-01T12:00:00Z",
      },
    ],
    lastMessageTimestamp: "2024-09-01T12:00:00Z",
    previewText: "Hey, how's it going?",
  },
];
