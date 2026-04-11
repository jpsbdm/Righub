import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

import { CSPostHogProvider } from "@/lib/posthog";

export const metadata: Metadata = {
  title: "RigHub | Energy Intelligence & Off-Grid Community",
  description: "Advanced energy diagnostics, shared vehicle setups, and technical community for off-grid travelers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <CSPostHogProvider>
          {children}
        </CSPostHogProvider>
      </body>
    </html>
  );
}
