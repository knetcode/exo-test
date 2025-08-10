"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 justify-end py-4 mb-4">
      <Link className={pathname === "/" ? "text-teal-500" : ""} href="/">
        Home
      </Link>
      <Link className={pathname === "/users" ? "text-teal-500" : ""} href="/users">
        Users
      </Link>
      <Link className={pathname === "/xml" ? "text-teal-500" : ""} href="/xml">
        XML Example
      </Link>
      <Link className={pathname === "/documents" ? "text-teal-500" : ""} href="/documents">
        Documents
      </Link>
    </nav>
  );
}
