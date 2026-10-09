"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProdutoCard({ id, nome, preco }) {
  // Cada cartão tem o seu próprio contador de quantidade
  const [quantidade, setQuantidade] = useState(0);

  function incrementar() {
    setQuantidade(quantidade + 1);
  }

  function decrementar() {
    // Não deixa a quantidade ficar negativa
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  }

  return (
    <div className="card">
      <h3>{nome}</h3>
      <p className="preco">R$ {preco.toFixed(2).replace(".", ",")}</p>

      <div className="quantidade">
        <button onClick={decrementar}>-</button>
        <span>{quantidade}</span>
        <button onClick={incrementar}>+</button>
      </div>

      <Link href={`/produtos/${id}`}>Ver detalhes</Link>
    </div>
  );
}
