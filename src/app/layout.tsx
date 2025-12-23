import type { Metadata } from "next";
import "./globals.css";

import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "CodeKrafters SRM RMP",
  description:
    "CodeKrafters SRM RMP is a student-led community with 7 technical and non-technical domains, focused on skills, innovation, and impact.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CodeKrafters SRM RMP",
    description:
      "IT’S MORE THAN A CLUB — A student community with 7 technical and non-technical domains driving innovation, creativity, and leadership.",
    url: "https://codekrafters-website.vercel.app/", // replace with real domain
    siteName: "CodeKrafters SRM RMP",
    images: [
      {
        url: "https://codekrafters-website.vercel.app/og.jpg",
        width: 1200,
        height: 630,
        alt: "CodeKrafters SRM RMP",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeKrafters SRM RMP",
    description:
      "IT’S MORE THAN A CLUB — Learn, build, and grow across 7 diverse domains.",
    images: ["https://codekrafters-website.vercel.app/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white dark">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
