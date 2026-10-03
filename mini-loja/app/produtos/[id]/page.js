/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Rota dinâmica /produtos/[id]
 */

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ImagemProduto from "../../../components/ImagemProduto";
import { infoProduto, formatarPreco } from "../../../lib/produtosInfo";

// Rota dinâmica: /produtos/101 -> lê o id da URL e mostra os detalhes do produto
export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/produtos.json")
      .then((res) => {
        if (!res.ok) throw new Error("Não foi possível carregar produtos.json");
        return res.json();
      })
      .then((lista) => {
        const encontrado = lista.find((p) => String(p.id) === String(id));
        if (!encontrado) throw new Error(`Produto ${id} não encontrado`);
        setProduto(encontrado);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section>
      <h1>Detalhes do produto {id}</h1>

      {loading && <p className="estado">Carregando...</p>}
      {error && <p className="estado erro">Erro: {error}</p>}

      {produto && (
        <div className="detalhe">
          <ImagemProduto id={produto.id} nome={produto.nome} grande />
          <div>
            <span className="selo">ID {produto.id}</span>
            <h2>{produto.nome}</h2>
            <p className="preco">{formatarPreco(produto.preco)}</p>
            <h4>Descrição</h4>
            <p>{infoProduto(produto.nome).descricao}</p>
          </div>
        </div>
      )}

      <Link href="/produtos" className="botao voltar">← Voltar para a listagem</Link>
    </section>
  );
}
