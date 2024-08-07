import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

const monstserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CalendAI",
  description: "Streamline the creation and scheduling of content for your social media with CalendAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monstserrat.className}>
        <ClerkProvider>
          <Toaster />
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
