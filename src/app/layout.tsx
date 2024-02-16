import type { Metadata } from "next";
import { BASE_URL } from "../constants/config";

import "./globals.css";

export const metadata: Metadata = {
  title: "Airstack Frames",
  description: "Airstack capabilities shown via Farcaster frames",
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
