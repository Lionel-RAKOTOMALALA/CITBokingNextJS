import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import ClientShell from "./ClientShell";

export const metadata: Metadata = {
  title: "Centre Touristique - Système de gestion",
  description: "Système de gestion du centre touristique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased bg-slate-900" suppressHydrationWarning>
        <ClerkProvider>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
