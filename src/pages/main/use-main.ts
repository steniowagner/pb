import { useMemo, useState } from "react";

import { ChatConversation } from "../../types";

export const useMain = () => {
  const [chatConversation, setChatConversation] = useState<ChatConversation[]>(
    []
  );
  const [shouldShowSystemPromp, setShouldShowSystemPrompt] = useState(false);

  const history = useMemo(() => {
    if (!shouldShowSystemPromp) {
      return chatConversation.filter(
        (conversation) => conversation.role !== "system"
      );
    }
    return chatConversation;
  }, [chatConversation, shouldShowSystemPromp]);

  return {
    onClickRestartChat: () => setChatConversation([]),
    shouldShowSystemPromp,
    setShouldShowSystemPrompt,
    setChatConversation,
    chatConversation: history,
  };
};
