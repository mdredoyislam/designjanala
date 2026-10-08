import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Dashboard | DesignJanala", template: "%s | DesignJanala Dashboard" },
  icons: { icon: "/favicon.png" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable} antialiased`}>
      <body className="min-h-screen">
        <header className="sticky top-0 z-20 border-b border-line bg-night/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3" aria-label="Dashboard home">
              <Image src="/images/brand/logo-white.png" alt="DesignJanala" width={140} height={22} priority />
              <span className="hidden rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-ink uppercase sm:inline">
                Admin
              </span>
            </Link>
            <Nav />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
