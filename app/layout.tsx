"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import {Toaster} from "sonner";
import type React from "react";
import Link from "next/link"
import { useEffect, useState } from "react";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };

    // Check authentication status on mount
    checkAuth();

    // Listen for login/logout events
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange")); // Dispatch event to update UI
    window.location.href = "/";
  };

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
                {!isLoggedIn ? (
                  <>
                    <Link href="/auth/login">Login</Link>
                    <Link href="/support">Support Us</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/support">Support Us</Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Logout
                    </button>
                  </>
                )}
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