import { useState } from "react";
import { ChatConversation } from "../../types";

export const useMain = () => {
  const [chatConversation, setChatConversation] = useState<ChatConversation[]>(
    []
  );

  return {
    onClickRestartChat: () => setChatConversation([]),
    setChatConversation,
    chatConversation,
  };
};
