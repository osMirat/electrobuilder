import { ReactNode } from "react";
import { Header } from "@/widgets/Header/Header";
import { Sidebar } from "@/widgets/Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <section className="flex-1 overflow-auto p-8">
          {children}
        </section>
      </div>
    </main>
  );
}