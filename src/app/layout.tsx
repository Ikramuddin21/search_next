import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchlistProvider from "@/hooks/WatchlistProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center`}
        style={{
          backgroundImage:
            "linear-gradient(to left bottom,#e5f1f5,#e5f5ef,#ebf3f6,#e4f0f5)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <WatchlistProvider>
          <Header />
          <div className="min-h-screen h-full">{children}</div>
          <Footer />
        </WatchlistProvider>
      </body>
    </html>
  );
}
