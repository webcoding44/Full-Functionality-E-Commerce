import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import "./globals.css";



export const metadata: Metadata = {
  title: {
    default : "Full-Functionality-E-Commerce",
    template : "%s | Full-Functionality-E-Commerce"
  },

  icons : {
      icon : "/picture.jpg"
  },

  description : ""
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}