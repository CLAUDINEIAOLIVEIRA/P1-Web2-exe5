/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Página Produtos (useEffect, loading e error)
 */

"use client";
import { useState, useEffect } from "react";
import Container from "../../components/Container";
import ProdutoCard from "../../components/ProdutoCard";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega o produtos.json (gerado por gerar-produtos.js) ao abrir a página
  useEffect(() => {
    fetch("/produtos.json")
      .then((res) => {
        if (!res.ok) throw new Error("Não foi possível carregar produtos.json");
        return res.json();
      })
      .then((dados) => setProdutos(dados))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="estado">Carregando...</p>;
  if (error) {
    return (
      <p className="estado erro">
        Erro: {error}. Rode <code>node gerar-produtos.js 5</code> para gerar o arquivo.
      </p>
    );
  }

  return (
    <Container titulo={`Nossos Produtos (${produtos.length})`}>
      <div className="grade">
        {produtos.map((p) => (
          <ProdutoCard key={p.id} id={p.id} nome={p.nome} preco={p.preco} />
        ))}
      </div>
    </Container>
  );
}
