import "./globals.css";

import { initMocks } from "@/mocks";
import { MSWComponent } from "@/src/providers/MSWComponent";
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
        <MSWComponent>
          <QueryProvider>{children}</QueryProvider>
        </MSWComponent>
      </body>
    </html>
  );
}
