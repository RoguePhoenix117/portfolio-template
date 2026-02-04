import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/lib/theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  var el = document.documentElement;
  if (t === 'dark') el.setAttribute('data-theme','dark');
  else if (t === 'light') el.setAttribute('data-theme','light');
  else el.removeAttribute('data-theme');
})();
`;

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
