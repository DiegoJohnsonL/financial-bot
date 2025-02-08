import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finzo - AI-Powered Financial Assistant",
  description:
    "Finzo is an AI-powered chatbot that connects through WhatsApp to help you track and manage your expenses effortlessly. Get personalized financial insights through natural conversations.",
  keywords: [
    "finance chatbot",
    "expense tracking",
    "WhatsApp bot",
    "personal finance",
    "AI financial assistant",
    "money management",
    "budget tracking",
  ],
  authors: [{ name: "FinChat" }],
  openGraph: {
    title: "FinChat - AI-Powered Financial Assistant",
    description: "Track your expenses easily through WhatsApp with our AI-powered financial assistant",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinChat - AI-Powered Financial Assistant",
    description: "Track your expenses easily through WhatsApp with our AI-powered financial assistant",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
