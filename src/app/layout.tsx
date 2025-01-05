import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "adhan time | Easiest way to check prayer times",
  description: "Get quick and easy prayer times for any location worldwide.",
  keywords: "prayer times, islamic prayer, salah times, namaz times, adhan time, simple prayer times",
  authors: [{ name: "adhan time" }],
  icons: {
    icon: '/kaaba.svg',
    shortcut: '/kaaba.svg',
    apple: '/kaaba.svg',
  },
  openGraph: {
    title: "adhan time | Easiest way to check prayer times",
    description: "Get quick and easy prayer times for any location worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "dhan time | Easiest way to check prayer times",
    description: "Get quick and easy prayer times for any location worldwide.",
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
