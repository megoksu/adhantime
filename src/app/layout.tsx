import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayer Times | Worldwide Islamic Prayer Times",
  description: "Get accurate prayer times for any location worldwide. Features include Qibla direction, Hijri calendar, and multiple language support.",
  keywords: "prayer times, islamic prayer, salah times, namaz times, qibla direction, hijri calendar",
  authors: [{ name: "Prayer Times App" }],
  icons: {
    icon: '/kaaba.svg',
    shortcut: '/kaaba.svg',
    apple: '/kaaba.svg',
  },
  openGraph: {
    title: "Prayer Times | Worldwide Islamic Prayer Times",
    description: "Get accurate prayer times for any location worldwide",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer Times | Worldwide Islamic Prayer Times",
    description: "Get accurate prayer times for any location worldwide",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
