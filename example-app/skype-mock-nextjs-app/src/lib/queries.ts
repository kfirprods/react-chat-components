import { RawChatData } from "@/types";
import { CHATS } from "./hardcoded-db";

export async function getUserChats(userId: string): Promise<RawChatData[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return CHATS;
}
