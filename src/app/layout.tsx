import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",
  description: "Portfolio website showcasing my development skills, projects, and blog posts.",
  keywords: ["developer", "portfolio", "web development", "full stack", "react", "nextjs"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Full Stack Developer",
    description: "Portfolio website showcasing my development skills, projects, and blog posts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
