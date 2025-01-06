import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "adhan time | Easiest way to check prayer times",
  description: "Get quick and easy prayer times for any location worldwide. Accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha.",
  keywords: "prayer times, islamic prayer, salah times, namaz times, adhan time, simple prayer times, muslim prayer schedule, islamic prayer calculator, prayer time app",
  authors: [{ name: "adhan time" }],
  icons: {
    icon: '/kaaba.svg',
    shortcut: '/kaaba.svg',
    apple: '/kaaba.svg',
  },
  openGraph: {
    title: "adhan time | Easiest way to check prayer times",
    description: "Get quick and easy prayer times for any location worldwide. Accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha.",
    type: "website",
    locale: "en_US",
    siteName: "adhan time",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'adhan time prayer schedule'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "adhan time | Easiest way to check prayer times",
    description: "Get quick and easy prayer times for any location worldwide. Accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha.",
    images: ['/twitter-image.jpg'],
    creator: "@adhantime"
  },
  alternates: {
    canonical: 'https://adhantime.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className="flex-grow pb-32">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
