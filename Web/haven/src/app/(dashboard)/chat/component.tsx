"use client"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MessageInterface {
    id: number;
    message: string;
    isSent: boolean;
}

export default function Component() {
    const [messages, setMessages] = useState<MessageInterface[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])
    const handleSendMessage = (message: string) => {
        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                message,
                isSent: true,
            },
        ])
    }
    return (
        <div className="flex flex-col h-full w-full p-4">
            <div className="flex-1 overflow-hidden h-full bg-background">
                <ScrollArea className="h-full">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex items-start gap-4 ${message.isSent ? "justify-end" : ""}`}>
                                <div
                                    className={`p-3 rounded-lg max-w-[80%] ${message.isSent ? "bg-primary text-primary-foreground" : "bg-secondary"
                                        }`}
                                >
                                    <div>{message.message}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </div>
            <div className="bg-background border-muted">
                <div className="flex items-center gap-2">
                    <Textarea
                        placeholder="Type your message..."
                        className="flex-1 resize-none rounded-lg border border-muted px-4 py-2"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage(e.currentTarget.value)
                                e.currentTarget.value = ""
                            }
                        }}
                    />
                    <Button
                        onClick={() => {
                            const message = document.querySelector("textarea")!.value.trim()
                            if (message) {
                                handleSendMessage(message)
                                document.querySelector("textarea")!.value = ""
                            }
                        }}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}