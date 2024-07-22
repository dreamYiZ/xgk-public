// import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'animate.css';
import Framework from "./framework"


// import function to register Swiper custom elements
// import { register } from 'swiper/element/bundle';
// register Swiper custom elements
// register();

const bodyClass = 'xgk-body'

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "小龟壳低代码",
  description: "小龟壳低代码大屏,小龟壳大屏,低代码,小龟壳,大屏低代码",
};

export default function RootLayout({ children }) {

  return (
    <html lang="zh-CN">
      <body className={bodyClass}>
        <Framework>
          {children}
        </Framework>
      </body>
    </html>
  );
}
