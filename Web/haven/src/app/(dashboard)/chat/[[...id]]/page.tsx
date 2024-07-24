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
        <div className="h-full px-4">
            <Tabs defaultValue={"chat"} className="w-full h-full flex flex-col">
                <div className="flex justify-between">
                    <TabsList>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                    <NewChatButton />
                </div>
                <div className="h-full overflow-hidden">
                    <TabsContent value="history" className="h-full">
                        <ChatHistory chats={histories} />
                    </TabsContent>
                    <TabsContent value="chat" className="h-full">
                        <ChatPage messages={chat?.ChatMessage} />
                    </TabsContent>
                </div>
            </Tabs>
        </div >
    )

}