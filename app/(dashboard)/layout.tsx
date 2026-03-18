import { ReactNode } from "react";

import Navbar from "../../src/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="o-8 flex min-h-screen p-8">
      <aside className="w-1/4">
        <Navbar />
      </aside>

      <main className="w-3/4">{children}</main>
    </div>
  );
}
