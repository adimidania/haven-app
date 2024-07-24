import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getChat, getListOfChatHistory } from "@/data/chat";
import ChatHistory from "./chat-history";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatPage from "./component";
import NewChatButton from "./new-chat-button";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Chat",
    description: "Chat with your medical buddy.",
};

export default async function Page({ params }: { params: { id: string[] } }) {
    const session = await auth()
    if (!session) {
        return redirect("/auth/login")
    }
    const histories = await getListOfChatHistory(session.user.id)

    const chat = await getChat(params.id ? params.id[0] : '', session.user.id)

    if (params.id && params.id.length > 0 && !chat) {
        return redirect("/chat")
    }

    return (
        <div className="flex h-full px-4">
            <Tabs defaultValue={"chat"} className="w-full h-full">
                <div className="flex justify-between">
                    <TabsList>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                    <NewChatButton />
                </div>
                <TabsContent value="history" className="h-[calc(100%-3rem)] overflow-hidden">
                    <ChatHistory chats={histories} />
                </TabsContent>
                <TabsContent value="chat" className="h-[calc(100%-3rem)] overflow-hidden">
                    <ChatPage messages={chat?.ChatMessage} />
                </TabsContent>
            </Tabs>
        </div >
    )

}