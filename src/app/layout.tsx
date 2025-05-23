import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import DisableSidebar from "@/components/side-bar/disableSidebar";
import DisableNavbar from "@/components/nav-bar/disableNavbar";

import SidebarProvider_ from "@/components/side-bar/sidebarProvider";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHO Scheduler",
  description: "A scheduler for PHO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const localization = {
    socialButtonsBlockButton: 'Sign In with {{provider|titleize}}',
    signIn: {
      start: {
        titleCombined: "Sign in to PHO admin",
        subtitleCombined: "Use admin account to sign in",
      },
    }
  };

  return (
    <html lang="en">
      <ClerkProvider localization={localization}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider_>
            <DisableSidebar />
            <main className="w-full">
              <DisableNavbar />
              {children}
            </main>
            <Toaster />
          </SidebarProvider_>
        </body>
      </ClerkProvider>
    </html>
  );
}
