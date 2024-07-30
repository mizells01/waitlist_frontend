import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/authProvider";
import { ThemeProvider } from "@/components/themeProvider"

import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import BaseLayout from "@/components/layout/BaseLayout";
import { Suspense } from "react";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Waitlist",
  description: "Financial Business Consulting and Profit Experts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
          >
          <AuthProvider>
          <BaseLayout className="flex min-h-[calc(100vh_-_theme(spacing.16))]
            flex-1 flex-col bg-muted/40">
            {children}
          </BaseLayout>
          </AuthProvider>
          </ThemeProvider>
        </Suspense>
        </body>
    </html>
  );
}