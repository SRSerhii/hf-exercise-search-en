import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script';

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
      <head>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/*<!--Start of Tawk.to Script-->*/}
        <Script id="tawk-to-script" strategy="afterInteractive"> {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src="${process.env.NEXT_PUBLIC_TAWK_TO_SRC}";
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        `}</Script>

        {/*<!--End of Tawk.to Script-->*/}

      </body>
    </html>
  );
}
