"use client"

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function NewChatButton() {
    const pathname = usePathname()

    const newChat = () => {
        if (pathname !== "/chat") {
            window.location.href = '/chat'
        }
    }

    return (
        <Button className="bg-muted text-muted-foreground hover:bg-muted" onClick={newChat}>New Chat</Button>
    )
}