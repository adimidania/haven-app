import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UserSignUpForm } from "./form";
import { Suspense } from "react";

export default function Page() {
    return (
        <ScrollArea className="h-full bg-[url('/landing-page/background.svg')] bg-no-repeat bg-cover">
            <div className="flex flex-col items-center justify-center h-full w-full px-10 pt-20">
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <Image src={"/sign-in/star.svg"} width={20} height={20} alt="Smile icon" className="mb-auto" />
                        <p className="text-5xl text-center">Create an accou<span className="underline decoration-wavy" style={{ textDecorationThickness: "5%", textUnderlineOffset: "10px" }}>nt</span></p>
                        <Image src={"/landing-page/smile-icon.svg"} width={20} height={20} alt="Smile icon" className="mt-auto ml-2" />
                    </div>
                    <p className="mt-8">You do have an account? <Link href="/auth/sign-in" className={cn(buttonVariants({ variant: "link" }), "p-0")}>Sign in</Link></p>
                </div>
                <Suspense>
                    <UserSignUpForm className="w-full md:w-1/2 lg:w-1/3 mb-20" />
                </Suspense>
                <div className="hidden md:block md:relative md:right-0 md:w-full">
                    <Image src={"/sign-up/person.svg"} width={150} height={150} alt="Person" className="absolute right-5 bottom-5" />
                </div>
            </div>
        </ScrollArea >
    )
}