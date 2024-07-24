"use client"

import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import { useSession } from 'next-auth/react';
import { useSidebar } from '@/hooks/useSidebar';

export default function Header() {
    const { isMinimized } = useSidebar();
    const { data: session } = useSession();

    return (
        <div className={cn("supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 bg-background/95 backdrop-blur duration-500",
            !isMinimized ? 'md:left-60' : 'md:left-[72px]',)}>
            <nav className="flex h-14 items-center justify-between px-4">
                <div className="hidden md:block">
                </div>
                <div className={cn('block md:!hidden')}>
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