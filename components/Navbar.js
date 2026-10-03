import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <Link href="/">Início</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/produtos">Produtos</Link>
        </nav>
    );
}