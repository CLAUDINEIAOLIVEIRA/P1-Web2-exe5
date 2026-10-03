/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Página inicial
 */

import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <h1>Mini Loja Online</h1>
      <p>Bem-vindo! Confira nossos produtos e escolha as quantidades que deseja.</p>
      <Link href="/produtos" className="botao">Ver produtos</Link>
    </section>
  );
}
