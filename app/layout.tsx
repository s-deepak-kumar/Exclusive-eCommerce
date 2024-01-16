import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exclusive - An eCommerce App",
  description: "This app is built for assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar component */}
        <Navbar />

        {/* main component. Do not use the main tag in any other component. Only one per page should be present */}
        <main>{children}</main>
      </body>
    </html>
  );
}
