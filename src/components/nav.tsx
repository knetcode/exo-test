"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 md:justify-end justify-center py-4">
          <Link
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-2xl hover:bg-teal-400/10 ${
              pathname === "/" ? "text-teal-500" : "text-muted-foreground"
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-2xl hover:bg-teal-400/10 ${
              pathname === "/users" ? "text-teal-500" : "text-muted-foreground"
            }`}
            href="/users"
          >
            Users
          </Link>
          <Link
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-2xl hover:bg-teal-400/10 ${
              pathname === "/xml" ? "text-teal-500" : "text-muted-foreground"
            }`}
            href="/xml"
          >
            XML Example
          </Link>
          <Link
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-2xl hover:bg-teal-400/10 ${
              pathname === "/documents" ? "text-teal-500" : "text-muted-foreground"
            }`}
            href="/documents"
          >
            Documents
          </Link>
        </div>
      </div>
    </nav>
  );
}
