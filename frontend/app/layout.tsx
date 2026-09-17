import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutWrapper } from "@/components/common/layout-wrapper";
import { Providers } from "@/components/providers";


const fontSans = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans", // CSS variable declaration
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Stayzy - Smart Hotel Booking Platform",
    template: "%s | Stayzy",
  },
  description: "Stayzy - Premier smart hotel booking platform. Discover and book luxury rooms with best rates and seamless experience.",
  keywords: ["hotel booking", "smart hotel", "travel", "luxury rooms", "Stayzy", "online reservation"],
  authors: [{ name: "Stayzy Team" }],
  creator: "Stayzy",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stayzy.com",
    siteName: "Stayzy",
    title: "Stayzy - Smart Hotel Booking Platform",
    description: "Premier smart hotel booking platform with best rate guarantee",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Stayzy Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${fontSans.variable} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

