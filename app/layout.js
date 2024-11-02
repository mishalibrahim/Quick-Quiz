import localFont from "next/font/local";
import "./globals.css";
import { Nunito } from "next/font/google";
import { AppWrapper } from "./context";

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

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});
export const metadata = {
title: "Quick Quiz",
  description: "A quiz app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` font-Nunito antialiased flex justify-center items-center`}>
        <AppWrapper>
        <div className=" w-full h-auto bg-white">{children}</div>
        </AppWrapper>
      </body>
    </html>
  );
}
