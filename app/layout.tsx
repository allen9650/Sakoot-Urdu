import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سکوت • SHAGGY | A Quiet World of Urdu Poetry & Solitude",
  description:
    "A quiet night, an open book, Urdu poetry and thousands of unspoken thoughts. Created with رضا (Raza). Enter the private digital world of a contemplative soul.",
  keywords: [
    "Urdu Poetry",
    "Faiz Ahmad Faiz",
    "Ahmad Faraz",
    "Rekhta",
    "Solitude",
    "Literature",
    "Ambivert",
    "Quiet Nights"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="ltr" className="scroll-smooth antialiased">
      <body className="min-h-screen bg-[#07080b] text-[#f4eee6]">
        {children}
      </body>
    </html>
  );
}
