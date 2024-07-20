import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
    return (
        <ScrollArea className="h-full">
            <h1 className="pl-8 pt-8 font-bold text-3xl">Saved Items</h1>
            <div className="flex">
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 w-1/2">
                    Saved Items
                </div>
            </div>
        </ScrollArea>
    )
}