import ReactQueryProviders from "@/components/providers/reactQuery";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokeApi | Andi",
  description: "PokeApi | Andi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryProviders>
        <body>{children}</body>
      </ReactQueryProviders>
    </html>
  );
}
