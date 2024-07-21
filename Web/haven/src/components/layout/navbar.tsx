import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { SVGProps } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function NavBar() {
    return (
        <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
            <Link href="#" className="flex items-center" prefetch={false}>
                <Image
                    src="/logo.svg"
                    alt="Haven logo"
                    className="dark:invert"
                    width={24}
                    height={24}
                    priority
                />
                <span className="font-bold ml-2">Haven</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-4">
                <Link
                    href="#about"
                    className="text-sm font-medium hover:text-primary transition"
                    prefetch={false}
                >
                    About
                </Link>
                <Link
                    href="#reviews"
                    className="text-sm font-medium hover:text-primary transition"
                    prefetch={false}
                >
                    Reviews
                </Link>
                <Link
                    href="#faq"
                    className="text-sm font-medium hover:text-primary transition"
                    prefetch={false}
                >
                    FAQ
                </Link>
                <Link
                    href="#donate"
                    className="text-sm font-medium hover:text-primary transition"
                    prefetch={false}
                >
                    Donate
                </Link>
            </nav>
            <Link href={"/auth/sign-in"} className={cn(buttonVariants(), "hidden lg:inline-flex text-white")}>Get Started</Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="grid gap-4 py-6">
                        <Link
                            href="#about"
                            className="flex items-center text-sm font-medium hover:text-primary transition"
                            prefetch={false}
                        >
                            About
                        </Link>
                        <Link
                            href="#reviews"
                            className="flex items-center text-sm font-medium hover:text-primary transition"
                            prefetch={false}
                        >
                            Reviews
                        </Link>
                        <Link
                            href="#faq"
                            className="flex items-center text-sm font-medium hover:text-primary transition"
                            prefetch={false}
                        >
                            FAQ
                        </Link>
                        <Link
                            href="#donate"
                            className="flex items-center text-sm font-medium hover:text-primary transition"
                            prefetch={false}
                        >
                            Donate
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}
