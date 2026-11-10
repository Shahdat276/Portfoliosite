import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { INITIAL_SITE_CONFIG } from "@/data/siteConfig";
import "./globals.css";

const portraitUrl = INITIAL_SITE_CONFIG.portrait.imageUrl || "/images/shahdat.jpg";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),
  title: "Shahdat Hossain | Senior Video Editor & Motion Graphics Designer",
  description:
    "Explore the portfolio of Shahdat Hossain, a Senior Video Editor and Motion Graphics Designer with 9+ years of experience in commercial video production, fashion films, motion graphics, and visual storytelling.",
  keywords: [
    "Video Editor",
    "Motion Graphics Designer",
    "Shahdat Hossain",
    "Commercial Video",
    "Fashion Film",
    "DaVinci Resolve",
    "Premiere Pro",
    "After Effects",
    "Cinema 4D",
    "Dhaka Bangladesh",
  ],
  authors: [{ name: INITIAL_SITE_CONFIG.name }],
  icons: {
    icon: portraitUrl,
    shortcut: portraitUrl,
    apple: portraitUrl,
  },
  openGraph: {
    title: "Shahdat Hossain | Senior Video Editor & Motion Graphics Designer",
    description:
      "Transforming ideas into compelling visual experiences with 9+ years of professional video editing and motion graphics expertise.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: portraitUrl,
        width: 1200,
        height: 1200,
        alt: "Shahdat Hossain — Senior Video Editor & Motion Graphics Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahdat Hossain | Senior Video Editor & Motion Graphics Designer",
    description:
      "Senior Video Editor & Motion Graphics Designer with 9+ years of experience.",
    images: [portraitUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#11100F] selection:bg-[#D4AF37] selection:text-[#11100F]">
        {children}
      </body>
    </html>
  );
}
