import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Link href="/users">Users</Link>
      <Link href="/xml">XML</Link>
    </div>
  );
}
