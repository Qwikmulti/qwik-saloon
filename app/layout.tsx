import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/toast-provider";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Qwik Salon | Premium Unisex Salon Booking",
  description: "Book your next appointment at Qwik Salon. Premium hair and beauty services for everyone. Transform your look with our expert stylists.",
  keywords: ["salon", "haircut", "hairdresser", "beauty", "styling", "booking", "London"],
  authors: [{ name: "Qwik Salon" }],
  openGraph: {
    title: "Qwik Salon | Premium Unisex Salon Booking",
    description: "Book your next appointment at Qwik Salon. Premium hair and beauty services for everyone.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en-GB" suppressHydrationWarning className="dark">
        <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-[#0a0a0b] text-[#fafafa] antialiased`}>
          <ErrorBoundary>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <ToastProvider>
                {children}
              </ToastProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}