import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// Konfigurasi font DM Sans yang benar
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CMS Yuna Updation",
  description: "Yuna Updation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased w-screen h-screen overflow-hidden`}>
        {/* Kontainer dengan scroll khusus */}
        <div className="h-full overflow-y-auto scroll-container">
          {children}
        </div>
      </body>
    </html>
  );
}
