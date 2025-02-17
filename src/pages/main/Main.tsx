import { User, Bot } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { UploadFile } from "./components/upload-file/UploadFile";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { useMain } from "./use-main";

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
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Chat Conversation</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[60vh] overflow-y-scroll">
          {main.chatConversation.map((chat, index) => (
            <div key={index} className="flex items-start space-x-4 mb-4">
              <div className="bg-gray-100 p-2 rounded-full">
                {chat.role === "user" ? (
                  <User className="w-8 h-8 text-blue-500" />
                ) : (
                  <Bot className="w-8 h-8 text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold">
                  {chat.role === "user" ? "User" : "Assistant"}
                </p>
                <div className="break-words text-wrap whitespace-normal max-w-4xl">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {chat.content}
                  </Markdown>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {new Date(chat.date).toLocaleString()} | Model:{" "}
                  {chat.model} | Tokens: {chat.num_tokens}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={main.onClickRestartChat}>Restart chat</Button>
      </CardFooter>
    </Card>
  );
};
