import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Salty Boats | Florida Skiffs & Bay Boats",
    template: "%s | Salty Boats",
  },
  description:
    "Florida's home for quality skiffs and bay boats. Three brands — Stumpnocker, Palmetto Bay, and Salty Skiffs. Build your custom boat or shop ready-to-go packages.",
  keywords: [
    "boats",
    "skiffs",
    "bay boats",
    "Florida boats",
    "Stumpnocker",
    "Palmetto Bay",
    "Salty Skiffs",
    "fishing boats",
    "shallow water boats",
    "boat builder",
    "custom boats",
    "boat configurator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Salty Boats",
    title: "Salty Boats | Florida Skiffs & Bay Boats",
    description:
      "Three brands of quality skiffs and bay boats — from fully customizable builds to ready-to-fish packages. Handcrafted in Florida.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salty Boats | Florida Skiffs & Bay Boats",
    description:
      "Three brands of quality skiffs and bay boats — from fully customizable builds to ready-to-fish packages. Handcrafted in Florida.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
