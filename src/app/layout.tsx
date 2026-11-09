import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  authors: [{ name: "Shahdat Hossain" }],
  openGraph: {
    title: "Shahdat Hossain | Senior Video Editor & Motion Graphics Designer",
    description:
      "Transforming ideas into compelling visual experiences with 9+ years of professional video editing and motion graphics expertise.",
    type: "website",
    locale: "en_US",
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
      <body className="min-h-full flex flex-col font-sans selection:bg-[#D9381E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
