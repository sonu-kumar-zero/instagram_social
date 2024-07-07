import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "@/components/theme-provider";


const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex w-[100dvw] h-[100dvh] overflow-hidden`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            <Navbar />
            {children}
            </ThemeProvider>
      </body>
    </html>
  );
}





