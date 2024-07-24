"use client"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addMessageAction, createANewChatAction, getAIMessageAction } from "@/app/actions/chat-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Markdown from "react-markdown"

interface MessageInterface {
    id: string;
    message: string;
    isSent: boolean;
}

export default function ChatPage(props: { messages?: MessageInterface[] }) {
    const [messages, setMessages] = useState<MessageInterface[]>(props.messages || [])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [value, setValue] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const params = useParams<{ id: string[] }>()
    const router = useRouter()

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].isSent && !loading) {
            setError(true)
        }
    }, [messages, loading, error, setError])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView()
        }
    }, [])


    const handleSendMessage = async (message: string) => {
        if (params.id === undefined) {
            const chatId = await createANewChatAction(message)
            if (chatId) {
                router.push(`/chat/${chatId}`)
                params.id = [chatId]
            } else {
                return message
            }
        }
        const messageId = await addMessageAction(params.id ? params.id[0] : "", message)
        if (messageId) {
            setMessages((messages) => [
                ...messages,
                {
                    id: messageId,
                    message,
                    isSent: true,
                },
            ])
        }
        await getAIResponse()
    }

    const getAIResponse = async () => {
        setLoading(true)
        const aiMessage = await getAIMessageAction(params.id[0])
        if (aiMessage) {
            if (error) {
                setError(false)
            }
            setMessages((messages) => [
                ...messages,
                {
                    id: aiMessage.id,
                    message: aiMessage.message,
                    isSent: false,
                },
            ])
        } else {
            setError(true)
        }
        setLoading(false)
    }

    const retryAIMessage = async () => {
        setError(false)
        await getAIResponse()
    }


    return (
        <div className="flex flex-col h-full w-full p-4">
            {messages.length === 0 && !loading ? <p className="m-auto font-semibold text-xl">Send a message to start a conversation.</p> : null}
            <div className="flex-1 overflow-hidden h-full bg-background">
                <ScrollArea className="h-full">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex items-start gap-4 ${message.isSent ? "justify-end" : ""}`}>
                                <div
                                    className={`p-3 rounded-lg max-w-[80%] ${message.isSent ? "bg-primary text-primary-foreground" : "bg-secondary"
                                        }`}
                                >
                                    {message.isSent ? <div>{message.message}</div> : <div className="prose xl:prose-xl dark:prose-invert">
                                        <Markdown>{message.message}</Markdown>
                                    </div>}

                                </div>
                            </div>
                        ))}
                        {error && (
                            <div className="flex items-start gap-4">
                                <div
                                    className="p-3 rounded-lg max-w-[80%] bg-secondary">
                                    <div>Something went wrong. Please try again.</div>
                                </div>
                            </div>
                        )}
                        {loading && <div className={`flex items-start gap-4`}>
                            <div
                                className={`p-3 rounded-lg max-w-[80%] bg-secondary space-y-2`}
                            >
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </div>
            <div className="bg-background border-muted">
                <div className="flex items-center gap-2">
                    {error ? <Button className="mx-auto" onClick={retryAIMessage}>Retry</Button> : (
                        <>
                            <Textarea
                                placeholder="Type your message..."
                                className="flex-1 resize-none rounded-lg border border-muted px-4 py-2"
                                disabled={loading}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        const message = e.currentTarget.value
                                        if (message) {
                                            e.currentTarget.value = ""
                                            const retryMessage = await handleSendMessage(message)
                                            if (retryMessage) {
                                                e.currentTarget.value = retryMessage
                                            }
                                        }
                                    }
                                }}
                            />
                            <Button
                                disabled={loading}
                                onClick={async () => {
                                    const message = document.querySelector("textarea")!.value.trim()
                                    if (message) {
                                        document.querySelector("textarea")!.value = ""
                                        const retryMessage = await handleSendMessage(message)
                                        if (retryMessage) {
                                            document.querySelector("textarea")!.value = retryMessage
                                        }
                                    }
                                }}
                            >
                                Send
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}