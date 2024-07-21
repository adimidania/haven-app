import { ScrollArea } from "@/components/ui/scroll-area";
import Component from "./component";

export default function Page() {
    return (
        <div className="flex">
            <div className="flex-1 p-4 pt-6 md:p-8 w-1/2">
                <Component />
            </div>
        </div>
    )
}

