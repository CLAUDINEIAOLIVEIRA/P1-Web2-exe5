import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Mini Loja</h1>
      <p>Bem-vindo à Mini Loja! Aqui você encontra produtos de todos os tipos.</p>
      <Link href="/produtos" className="botao">
        Ver produtos
      </Link>
    </section>
  );
}
