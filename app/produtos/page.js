"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import ProdutoCard from "@/components/ProdutoCard";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch("/produtos.json");

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        setError(erro.message);
      } finally {
        setLoading(false);
      }
    }

    buscarProdutos();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="erro">Erro: {error}</p>;
  }

  return (
    <Container titulo="Nossos Produtos">
      <div className="lista-cards">
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            id={produto.id}
            nome={produto.nome}
            preco={produto.preco}
          />
        ))}
      </div>
    </Container>
  );
}
