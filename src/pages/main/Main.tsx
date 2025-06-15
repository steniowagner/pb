import { User, Bot } from "lucide-react";

import { UploadFile } from "./components/upload-file/UploadFile";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useMain } from "./use-main";
import { ChatRole } from "../../types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const roles: Record<ChatRole, string> = {
  assistant: "Assistant",
  system: "System",
  user: "User",
};

export const Main = () => {
  const main = useMain();

  if (!main.chatConversation.length) {
    return (
      <Card>
        <CardContent className="w-96 h-64 pt-6">
          <UploadFile onAttachJSON={main.setChatConversation} />
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-full overflow-y-scroll">
      <div className="w-full justify-center flex mt-2">
        <div className="w-3/4 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <p>Show system prompt:</p>
            <Checkbox
              checked={main.shouldShowSystemPromp}
              onCheckedChange={(value) =>
                main.setShouldShowSystemPrompt(value as boolean)
              }
            />
          </div>
          <Button onClick={main.onClickRestartChat}>Restart chat</Button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center pt-4">
        {main.chatConversation.map((chat, index) => {
          return (
            <div key={index} className="w-3/4 flex items-start space-x-4 mb-4">
              <div className="bg-gray-100 p-2 rounded-full">
                {chat.role === "user" ? (
                  <User className="w-8 h-8 text-blue-500" />
                ) : (
                  <Bot className="w-8 h-8 text-green-500" />
                )}
              </div>
              <Card
                className={
                  chat.role === "system" ? "bg-gray-200 border-black" : ""
                }
              >
                <CardContent className="flex flex-col gap-2">
                  <div>
                    <p className="font-bold mt-2">{roles[chat.role]}</p>
                    {chat.role !== "user" && (
                      <p className="text-xs text-gray-500">{`Model: ${chat.model}`}</p>
                    )}
                  </div>
                  <div className="break-words text-wrap whitespace-normal">
                    <pre className="break-words text-wrap">{chat.content}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
