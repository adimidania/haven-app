'use client';
import React, { useState } from 'react';
import { DashboardNav } from './dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import Image from 'next/image';

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const { isMinimized, toggle } = useSidebar();
    const [status, setStatus] = useState(false);

    const handleToggle = () => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    };
    return (
        <nav
            className={cn(
                `relative hidden h-screen flex-none z-10 pt-2 bg-secondary md:block`,
                status && 'duration-500',
                !isMinimized ? 'w-60' : 'w-[72px]',
                className
            )}
        >
            <Link
                href={'/'}
                className={cn(
                    'flex items-center justify-start w-11/12 gap-2 overflow-hidden rounded-md py-4 px-12 text-sm font-medium text-accent',
                    isMinimized && 'px-0 justify-center',
                )}
            >
                <Image
                    src="/white-logo.svg"
                    alt="logo"
                    width={24}
                    height={24}
                />
                {!isMinimized ? (
                    <span className="mr-2 truncate text-base">Haven</span>
                ) : (
                    ''
                )}
            </Link>

            <ChevronLeft
                className={cn(
                    'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                    isMinimized && 'rotate-180'
                )}
                onClick={handleToggle}
            />
            <div className="space-y-4 py-4 pt-8">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        <DashboardNav items={navItems} />
                    </div>
                </div>
            </div>
        </nav>
    );
}