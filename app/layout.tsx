import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import {Toaster} from "sonner";
import type React from "react";
import Link from "next/link"





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your tasks and subtasks",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="bg-background border-b">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <Link href="/" className="font-bold text-lg">
                Simply Habits
              </Link>
              <div className="space-x-4">
                <Link href="/auth/login">Login</Link>
                <Link href="/support">Support Us</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}