import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import ToastProvider from "@/components/common/Toast";
import NotificationSubscriber from "@/features/notification/NotificationSubscriber";
import Overlay from "@/hooks/useOverlay/Overlay";
import { pretendard } from "@/lib/fonts";
import { initMocks } from "@/mocks";
import MSWInitializer from "@/mocks/MSWInitializer";
import { ReactQueryClientProvider } from "@/providers/ReactQueryProvider";

initMocks();

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
            <ToastProvider
              max={5}
            >
              <NotificationSubscriber />
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
