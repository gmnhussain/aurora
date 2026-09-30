import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "G. M. Nazmul Hussain — Full-stack developer",
  description:
    "Full-stack developer in Dhaka. Four years building web and mobile apps with TypeScript, React, Next.js and Node.",
  metadataBase: new URL("https://nazmulhussain.com"),
};

export const viewport: Viewport = {
  themeColor: "#161826",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
