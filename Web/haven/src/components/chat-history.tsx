'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useChatHistory } from '@/hooks/useChatHistory';
import { Button } from './ui/button';
import { History, XIcon } from 'lucide-react';

export default function ChatHistory() {
    const { isMinimized, status, toggle } = useChatHistory();

    return (
        <div className="flex pl-6">
            <div
                className={cn(
                    `pt-2 bg-secondary overflow-hidden md:block`,
                    status && 'duration-500',
                    !isMinimized ? 'w-40' : 'w-0',
                )}
            >
                <h1 className='font-bold pl-2 text-accent'>Chat History</h1>
                <div className="space-y-4 py-4 pt-8">
                    <div className="px-3 py-2">
                        <div className="mt-3 space-y-1">
                        </div>
                    </div>
                </div>
            </div>
            <Button variant={"ghost"} onClick={toggle}>
                {!isMinimized ? <XIcon /> : <History />}
            </Button>
        </div>
    );
}