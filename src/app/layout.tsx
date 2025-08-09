import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/trpc/providers";
import type { Metadata } from "next";
import Link from "next/link";
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
  title: "EXOGROUP Test",
  description: "Application for EXOGROUP Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="p-4">
          <Providers>
            <nav className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/users">Users</Link>
              <Link href="/xml">XML Example</Link>
            </nav>
            {children}
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
