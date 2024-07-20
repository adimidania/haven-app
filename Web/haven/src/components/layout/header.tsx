"use client"

import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();

    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-14 items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link
                        href={'/home'}
                    >
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>
                <div className={cn('block lg:!hidden')}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    Welcome, {session?.user?.name.split(' ')[0]}
                    <UserNav />
                </div>
            </nav>
        </div>
    );
}