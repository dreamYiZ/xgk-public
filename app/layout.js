import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Framework from "./framework"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DATA VISION",
  description: "-- DATA VISION -- -- DATA VISION -- -- DATA VISION -- -- DATA VISION --",
};

export default function RootLayout({ children }) {

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Framework>
          {children}
        </Framework>
      </body>
    </html>
  );
}
