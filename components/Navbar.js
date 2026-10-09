import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/sobre">Sobre</Link>
      <Link href="/produtos">Produtos</Link>
    </nav>
  );
}
