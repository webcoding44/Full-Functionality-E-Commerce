import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Full Functionality E-Commerce",
    template: "%s | Full Functionality E-Commerce",
  },

  description: "A full functionality e-commerce website built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. It includes features such as product listing, shopping cart, checkout process, user authentication, and admin dashboard for managing products and orders.",

  icons : {
    icon: "/picture.jpg",
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
