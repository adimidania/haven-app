import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haven App",
  description: "Your medical buddy.",
};

export const viewport: Viewport = {
  interactiveWidget: "resizes-content"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <NextTopLoader showSpinner={false} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
