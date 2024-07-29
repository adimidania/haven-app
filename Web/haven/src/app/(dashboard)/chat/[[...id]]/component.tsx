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
import { toast } from "@/components/ui/use-toast"
import { v4 as uuid } from '@lukeed/uuid';
import { Icons } from "@/components/icons"

interface MessageInterface {
    id: string;
    message: string;
    isSent: boolean;
}

export default function ChatPage(props: { messages?: MessageInterface[] }) {
    const [messages, setMessages] = useState<MessageInterface[]>(props.messages || [])
    const [chatId, setChatId] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendingAI, setSendingAI] = useState(false)
    const [error, setError] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const params = useParams<{ id: string[] }>()
    const router = useRouter()
    const messageRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, sendingAI])

    useEffect(() => {
        if (sent) {
            setTimeout(() => {
                setSent(false)
                setSending(false)
            }, 700)
        }
    }, [sent])

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
        setLoading(true)
        const tempId = uuid();
        const newMessage = {
            id: tempId,
            message,
            isSent: true,
            isLoading: true
        }

        setMessages((messages) => [
            ...messages,
            newMessage
        ])


        setSending(true)
        if (params.id === undefined && chatId.length === 0) {
            const newChatId = await createANewChatAction(message)
            if (newChatId) {
                setChatId(newChatId)
                router.push(`/chat/${newChatId}`)
                params.id = [newChatId]
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                })
                setLoading(false)
                return message
            }
        }
        const messageId = await addMessageAction(params.id ? params.id[0] : chatId, message)
        setSent(true)
        if (messageId) {
            newMessage.id = messageId;
            await getAIResponse()
        } else {
            setMessages((messages) => {
                return messages.filter((msg) => msg.id !== tempId)
            })
            if (messageRef && messageRef.current) {
                messageRef.current.value = message
                messageRef.current.focus()
            }
            toast({
                title: "Error",
                description: "Something went wrong while sending the message.",
                variant: "destructive",
            })
        }
        setLoading(false)
    }

    const getAIResponse = async () => {
        setSendingAI(true)
        const aiMessage = await getAIMessageAction(params.id ? params.id[0] : chatId)
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
        setSendingAI(false)
    }

    const retryAIMessage = async () => {
        setError(false)
        await getAIResponse()
    }


    return (
        <div className="flex flex-col h-full w-full overflow-hidden p-4">
            <div className="flex-1 overflow-hidden h-full bg-background">
                <ScrollArea className="h-full">
                    {messages.length === 0 && !loading ? <p className="m-auto font-semibold text-xl">Send a message to start a conversation.</p> : null}
                    <div className="space-y-4">
                        {messages.map((message, idx) => (
                            <div key={message.id} className={`flex items-start gap-4 ${message.isSent ? "justify-end" : ""}`}>
                                <div
                                    className={`p-3 rounded-lg max-w-[80%] text-sm ${message.isSent ? "bg-primary text-primary-foreground" : "bg-secondary"
                                        }`}
                                >
                                    {message.isSent ? <div>{message.message}</div> : <div className="prose dark:prose-invert text-sm">
                                        <Markdown>{message.message}</Markdown>
                                    </div>}
                                    <div className="flex justify-end mr-0">
                                        {idx === messages.length - 1 && sending &&
                                            (
                                                !sent ?
                                                    (
                                                        <Icons.spinner className="h-3 w-3 animate-spin" />
                                                    ) : (

                                                        <Icons.check className="h-3 w-3" />
                                                    )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(error && !sendingAI) && (
                            <div className="flex items-start gap-4">
                                <div
                                    className="p-3 rounded-lg max-w-[80%] bg-secondary">
                                    <div>Something went wrong. Please try again.</div>
                                </div>
                            </div>
                        )}
                        {sendingAI && <div className={`flex items-start gap-4`}>
                            <div
                                className={`p-3 rounded-lg w-full max-w-[80%] bg-secondary space-y-2`}
                            >
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                        </div>}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </div>
            <div className="bg-background border-muted">
                <div className="flex items-center">
                    {error ? <Button className="mx-auto" onClick={retryAIMessage}>Retry</Button> : (
                        <>
                            <Textarea
                                placeholder="Type your message..."
                                className="flex-1 resize-none rounded-lg border border-muted pl-4 py-2 min-h-0 h-[60px] border-r-0 rounded-r-none focus-visible::border-transparent focus-visible:ring-0"
                                disabled={loading}
                                ref={messageRef}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        const message = e.currentTarget.value
                                        if (message) {
                                            e.currentTarget.value = ""
                                            await handleSendMessage(message)
                                        }
                                    }
                                }}
                            />
                            <Button
                                disabled={loading}
                                variant={"ghost"}
                                className="bg-none h-[60px] w-[60px] border border-l-0 rounded-l-none p-0 hover:bg-transparent"
                                onClick={async () => {
                                    const message = document.querySelector("textarea")!.value.trim()
                                    if (message) {
                                        document.querySelector("textarea")!.value = ""
                                        await handleSendMessage(message)
                                    }
                                }}
                            >
                                <Icons.sendMessage className="text-muted h-full" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}