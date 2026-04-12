import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

import { CSPostHogProvider } from "@/lib/posthog";
import { Navbar } from "@/components/shared/navbar";
import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "RigHub | Energy Intelligence & Off-Grid Community",
  description: "Advanced energy diagnostics, shared vehicle setups, and technical community for off-grid travelers.",
};

import { ThemeProvider } from "@/components/theme-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  const { user } = sessionId ? await lucia.validateSession(sessionId) : { user: null };

  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CSPostHogProvider>
            <Navbar user={user} />
            <main className="pt-16">{children}</main>
          </CSPostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
