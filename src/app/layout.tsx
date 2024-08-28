import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import { Toaster } from 'react-hot-toast';
import Navber from "@/components/navbers/Navber"
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] // Add the desired weights here
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
    <html lang="en"  className="dark:bg-slate-950">
      <body className={`${poppins.className} md:px-20 px-3 dark:bg-slate-950`}>
        <StoreProvider>
          <Navber />
          <main className="mt-[84px]">
            <Toaster/>
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
