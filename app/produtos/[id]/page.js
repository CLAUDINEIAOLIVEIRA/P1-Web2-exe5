"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DetalheProduto() {
  // useParams lê o [id] da URL. Em /produtos/101, id vale "101"
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function buscarProduto() {
      try {
        const resposta = await fetch("/produtos.json");

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dados = await resposta.json();
        // O id da URL é texto, por isso comparamos com Number(id)
        const encontrado = dados.find((item) => item.id === Number(id));

        if (!encontrado) {
          throw new Error(`Produto número ${id} não encontrado.`);
        }

        setProduto(encontrado);
      } catch (erro) {
        setError(erro.message);
      } finally {
        setLoading(false);
      }
    }

    buscarProduto();
  }, [id]);

  return (
    <section>
      <h1>Detalhes do produto</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="erro">Erro: {error}</p>}

      {produto && (
        <div className="detalhe">
          <p><strong>Número:</strong> {produto.id}</p>
          <p><strong>Nome:</strong> {produto.nome}</p>
          <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
        </div>
      )}

      <Link href="/produtos" className="botao">
        Voltar para Produtos
      </Link>
    </section>
  );
}
