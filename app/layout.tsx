/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";

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
  title: "TalentLink - Influencer Marketing Platform",
  description: "TalentLink is a centralized platform that streamlines collaboration between brand managers and influencers. Manage users, brands, and access permissions seamlessly.",
  metadataBase: new URL('https://talentlink-hk.vercel.app'),
  openGraph: {
    title: "TalentLink - Influencer Marketing Platform",
    description: "Connect brands with influencers, manage campaigns, and track performance with our state-of-the-art platform powered by NLP.",
    url: 'https://talentlink-hk.vercel.app',
    siteName: 'TalentLink',
    images: [
      {
        url: 'https://talentlink-hk.vercel.app/talentlink.png',
        width: 1200,
        height: 630,
        alt: 'TalentLink Platform Preview'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TalentLink - Influencer Marketing Platform",
    description: "Connect brands with influencers, manage campaigns, and track performance with our state-of-the-art platform powered by NLP.",
    images: ['https://talentlink-hk.vercel.app/talentlink.png'],
    creator: '@talentlink',
  },
  robots: {
    index: true,
    follow: true,
  }
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
