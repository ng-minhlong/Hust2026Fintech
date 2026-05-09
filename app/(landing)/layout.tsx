import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SlideMind — Turn ideas into beautiful slides in seconds",
  description:
    "Search, summarize, and generate fully editable presentations with AI. SlideMind turns prompts into pitch decks, academic decks, and more.",
  authors: [{ name: "SlideMind" }],
  openGraph: {
    title: "SlideMind — Turn ideas into beautiful slides in seconds",
    description:
      "Search, summarize, and generate fully editable presentations with AI. SlideMind turns prompts into pitch decks, academic decks, and more.",
    type: "website",
  }
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 👇 giữ đúng Google Fonts như Lovable */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}