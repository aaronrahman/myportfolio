import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Aaron's Portfolio",
  description: "A showcase of my work, travels, and music interests.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout> <Analytics /> <SpeedInsights /> {children}</ClientLayout>
      </body>
    </html>
  );
}