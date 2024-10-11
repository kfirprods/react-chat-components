import { getUserChats } from "@/lib/queries";

export async function GET(request: Request): Promise<Response> {
  // In a real app, you'd get the user ID from the request auth headers
  const userId = "1";

  const chats = await getUserChats(userId);
  chats.sort(
    (a, b) =>
      new Date(b.lastMessageTimestamp).getTime() -
      new Date(a.lastMessageTimestamp).getTime()
  );
  return new Response(JSON.stringify(chats));
}
