export type MessageAttachment = {
  id: string;
  url: string;
  type: "image" | "video" | "audio" | "file";

  title?: string;
};
