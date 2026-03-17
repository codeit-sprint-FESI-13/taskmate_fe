import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { initMocks } from "@/mocks";
import MSWInitializer from "@/mocks/MSWInitializer";
import { ReactQueryClientProvider } from "@/src/providers/ReactQueryProvider";

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
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </MSWInitializer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
