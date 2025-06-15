export type ChatRole = "user" | "assistant" | "system";

export type ChatConversation = {
  role: ChatRole;
  model: string;
  content: string;
  tokens: number;
  date: string;
};
