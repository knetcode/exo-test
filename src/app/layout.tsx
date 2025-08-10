import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/trpc/providers";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/nav";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0`}>
        <div className="p-4 h-screen ">
          <Providers>
            <Nav />
            {children}
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
