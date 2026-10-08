import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">[ 404 ]</p>
      <h1 className="h-display mt-6 text-6xl sm:text-8xl">Page not found.</h1>
      <p className="mt-6 max-w-md text-lg text-muted">The page you&rsquo;re looking for moved or never existed.</p>
      <Link href="/" className="btn-primary mt-10 self-start">
        Back to home <ArrowUpRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
