import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

import { ReactQueryClientProvider } from "@/shared/providers/ReactQueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
import Overlay from "@/shared/ui/Overlay/Overlay";

import { initMocks } from "../shared/mock";
import MSWInitializer from "../shared/mock/MSWInitializer";

initMocks();

const pretendard = localFont({
  src: "../shared/assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={pretendard.variable}
    >
      <body className={pretendard.className}>
        <MSWInitializer>
          <ReactQueryClientProvider>
            <ToastProvider max={5}>
              <Overlay />
              {children}
            </ToastProvider>
          </ReactQueryClientProvider>
        </MSWInitializer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
