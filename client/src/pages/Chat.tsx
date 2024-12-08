import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
};

type Chat = {
  id: number;
  title: string;
  preview: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [previousChats ] = useState<Chat[]>([]);
  const [suggestedTopics] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          alert("No token found. Please log in.");
          navigate("/signup");
          return;
        }
  
        const res = await axios.post(
          "http://127.0.0.1:3000/api/v1/user/check-auth",
          {}, // Empty body
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (res.status === 200) {
          alert("Pls chat");
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
  
        // Check for 401 or 403 to redirect the user
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert("Unauthorized: Redirecting to sign-up");
          navigate("/signup");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };
  
    fetchChats();
  }, []);
  
  const handleSend = async () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, content: input, sender: "user" },
      ]);
      setInput("");

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("No token found. Please log in.");
          return;
        }

        const response = await axios.post(
          "http://127.0.0.1:3000/api/v1/user/chat/chat",
          { userMessage: input },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(response.data);

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: response.data.aiMessage,
            sender: "ai",
          },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: "Error: Unable to process your message.",
            sender: "ai",
          },
        ]);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Previous Chats</h2>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {previousChats.map((chat) => (
                <div
                  key={chat.id}
                  className="mb-4 p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <h3 className="font-medium">{chat.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.preview}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <ScrollArea className="h-[calc(100vh-280px)] mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`flex items-start ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {message.sender === "user" ? "U" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`mx-2 p-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-grow mr-2"
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Suggested Topics</h2>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {suggestedTopics.map((topic, index) => (
                <div
                  key={index}
                  className="mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  {topic}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
