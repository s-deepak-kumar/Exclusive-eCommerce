import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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
    <html lang="en" className="bg-white">
      <body className={inter.className}>
        {/* main component. Do not use the main tag in any other component. Only one per page should be present */}
        <main>{children}</main>

        {/* Footer component */}
        <Footer />
      </body>
    </html>
  );
}
