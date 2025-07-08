import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function BackofficeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-black text-white">{children}</main>
    </div>
  );
} 