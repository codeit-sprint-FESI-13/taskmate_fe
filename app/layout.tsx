import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { initMocks } from "@/mocks";
import MSWInitializer from "@/mocks/MSWInitializer";
import QueryProvider from "@/src/providers/QueryProvider";

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSWInitializer>
          <QueryProvider>{children}</QueryProvider>
        </MSWInitializer>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
