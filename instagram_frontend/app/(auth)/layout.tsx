import { Poppins } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";


const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex w-[100dvw] h-[100dvh] overflow-hidden `}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
