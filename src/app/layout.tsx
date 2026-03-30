import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Componeo Elite | High-Performance React Matrix",
  description: "Exhibition and management platform for high-performance React modules. Verify, synthesize, and deploy atomic UI units with surgical precision.",
  keywords: ["React", "UI Components", "Registry", "Cyber-Luxury", "Design System"],
};

import { SandPackCSS } from "@/components/sandpack-styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <SandPackCSS />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased bg-[#050505] text-white`}
      >
        {/* Elite Refraction Matrix */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" focusable="false">
          <filter id="refraction-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {children}
      </body>
    </html>
  );
}
