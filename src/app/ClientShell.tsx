"use client";
import Topbar from "./Topbar";
import GlobalLoader from "@/components/GlobalLoader";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <GlobalLoader />
      {children}
    </>
  );
} 