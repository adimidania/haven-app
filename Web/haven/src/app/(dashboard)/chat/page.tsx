import Component from "./component";
import ChatHistory from "@/components/chat-history";

export default function Page() {
    return (
        <div className="flex h-full">
            <div className="relative flex">
                <ChatHistory />
            </div>
            <Component />
        </div >
    )
}

