/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: ProdutoCard com contador de quantidade (useState)
 */

"use client";
import { useState } from "react";
import Link from "next/link";
import ImagemProduto from "./ImagemProduto";
import { formatarPreco } from "../lib/produtosInfo";

// Recebe nome, preco e id via props. Cada card tem o seu próprio contador.
export default function ProdutoCard({ nome, preco, id }) {
  const [quantidade, setQuantidade] = useState(0);

  return (
    <article className="produto-card">
      <ImagemProduto id={id} nome={nome} />
      <div className="produto-corpo">
        <span className="selo">ID {id}</span>
        <h3>{nome}</h3>
        <p className="preco">{formatarPreco(preco)}</p>

        <div className="contador">
          <button onClick={() => setQuantidade(quantidade - 1)} disabled={quantidade === 0} aria-label="Diminuir quantidade">
            -
          </button>
          <span className="quantidade">{quantidade}</span>
          <button onClick={() => setQuantidade(quantidade + 1)} aria-label="Aumentar quantidade">
            +
          </button>
        </div>

        <p className="subtotal">
          {quantidade > 0 ? `Subtotal: ${formatarPreco(preco * quantidade)}` : "Selecione a quantidade"}
        </p>

        <Link href={`/produtos/${id}`} className="botao">Ver detalhes</Link>
      </div>
    </article>
  );
}
