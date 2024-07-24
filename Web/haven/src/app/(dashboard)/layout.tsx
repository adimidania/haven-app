import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { auth } from '@/lib/auth';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: "Haven App",
    description: "Your medical buddy.",
};

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <>
            <SessionProvider session={session}>
                <Header />
                <div className="flex h-[calc(100dvh)] overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 h-full overflow-hidden pt-16">{children}</main>
                </div>
            </SessionProvider>
        </>
    );
}