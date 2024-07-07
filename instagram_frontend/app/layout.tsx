import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserStateContext } from "@/context/userContext";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Instagram",
  description: "An online social media web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex w-[100dvw] h-[100dvh] overflow-hidden`}>
        <UserStateContext>
          {children}
        </UserStateContext>
      </body>
    </html>
  );
}
