"use client"

import { deleteChatAction } from "@/app/actions/chat-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Chat } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

export default function ChatHistory({ chats }: { chats: Chat[] }) {
    const deleteChat = async (id: string) => {
        await deleteChatAction(id)
    }

    return (
        <div className="bg-background text-foreground p-6 md:p-10 h-full">
            <div className="mx-auto h-full">
                <ScrollArea className="h-full">
                    <div className="space-y-4 px-4 w-full mb-8">
                        {chats.map((chat) => (
                            <Card key={chat.id} className="p-4 flex items-center justify-between">
                                <Link href={"/chat/" + chat.id}>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="font-medium"><Markdown>{chat.name}</Markdown></div>
                                            <div className="text-muted-foreground text-sm">{chat.createdAt.toDateString()}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex">
                                    <Dialog>
                                        <DialogTrigger className="text-destructive"><Trash /></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your chat
                                                    and remove your data from our servers.
                                                    <br />
                                                    <br />
                                                    <p>Chat Name: <span className="font-bold">
                                                        <Markdown>
                                                            {chat.name}
                                                        </Markdown>
                                                    </span></p>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant={"destructive"} onClick={() => deleteChat(chat.id)}>Delete</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div >
    )
}