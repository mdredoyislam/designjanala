/** Line icon for a technology category; falls back to a generic stack icon for new categories. */
const paths: Record<string, string> = {
  design: "M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3M4 4h6M4 4v6",
  frontend: "M3 5h18v12H3zM3 9h18M8 21h8M12 17v4M7 13l2-2-2-2",
  backend: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01M12 7h4M12 17h4",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  mobile: "M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zM10 18h4",
  cloud: "M7 18a4 4 0 01-.5-8A6 6 0 0118 9a4.5 4.5 0 01-.5 9H7z",
  devops: "M7 7a4 4 0 100 8M17 17a4 4 0 100-8M7 15c3 0 4-6 7-6h3M17 9c-3 0-4 6-7 6H7",
  ai: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z",
  analytics: "M4 20V10M10 20V4M16 20v-7M22 20H2",
};
const fallback = "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5";

export default function CategoryIcon({ category, className = "h-5 w-5" }: { category: string; className?: string }) {
  const d = paths[category.toLowerCase().replace(/[^a-z]/g, "")] ?? fallback;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
