"use client"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Component() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 1,
            user: "Alice",
            message: "Hey there! How's it going?",
            isSent: false,
        },
        {
            id: 2,
            user: "You",
            message: "I'm doing great, thanks for asking! How about you?",
            isSent: true,
        },
        {
            id: 3,
            user: "Bob",
            message: "I'm doing well too! Excited for our team meeting later.",
            isSent: false,
        },
        {
            id: 4,
            user: "You",
            message: "Me too! I have a few ideas I want to share with the team.",
            isSent: true,
        },
    ])
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
                user: "You",
                message,
                isSent: true,
            },
        ])
    }
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-hidden mt-8 bg-background">
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
            <div className="bg-background border-muted p-4">
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