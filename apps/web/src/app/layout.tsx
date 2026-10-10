import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

// Re-check the API for content edits at least every 5 minutes; dashboard saves refresh it immediately.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description:
      "DesignJanala designs and builds AI-powered products for startups, scale-ups and enterprises — AI automation, SaaS platforms, mobile apps, MVPs, UI/UX and brand design.",
    icons: { icon: "/images/brand/favicon.png" },
    openGraph: {
      type: "website",
      siteName: site.name,
      images: ["/images/portfolio/2019-02-1.jpg"],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { nav, serviceCategories, services } = await getContent();
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable} antialiased`}>
      <body id="top" className="flex min-h-screen flex-col bg-background">
        <Header content={{ nav, serviceCategories, services }} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
