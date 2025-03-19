import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrapHistoryProvider } from "@/context/ScrapHistoryContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import ScrapHistorySidebar from "@/components/ScrapHistorySidebar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scraping Once",
  description: "Scraping Once",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrapHistoryProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <ScrapHistorySidebar />
                <div className="flex-1">{children}</div>
              </div>
            </SidebarProvider>
          </ScrapHistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
