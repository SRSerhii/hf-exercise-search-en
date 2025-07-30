import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Search exercises by name, muscle group, or equipment | Serhii Shevchenko",
  description: "Free Tool to search exercises by name, muscle group, or equipment.",
  keywords: "weight loss, biohacking, fitness, exercises by muscle group, exercises by equipment, health, science-based nutrition",
  authors: [{ name: "Serhii Shevchenko" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Search exercises by name, muscle group, or equipment | Serhii Shevchenko",
    description: "Free Tool to search exercises by name, muscle group, or equipment.",
    url: "https://serhiishevchenko.com/exercises-by-name-muscle-group-equipment",
    siteName: "SerhiiShevchenko.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search exercises by name, muscle group, or equipment | Serhii Shevchenko",
    description: "Free Tool to search exercises by name, muscle group, or equipment.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
