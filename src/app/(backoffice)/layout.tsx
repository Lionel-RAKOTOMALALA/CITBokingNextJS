"use client";
import ClientShell from "../ClientShell";
import Sidebar from "./Sidebar";

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientShell>
      <div className="flex min-h-screen bg-slate-900">
        <Sidebar />
        <main className="flex-1 p-6 bg-slate-900 text-white">{children}</main>
      </div>
    </ClientShell>
  );
}