"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProdutoDetalhes({ params }) {
    const router = useRouter();
    const { id } = use(params);

    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        fetch("/produtos.json")
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro ao carregar produtos.");
                }

                return resposta.json();
            })
            .then((produtos) => {
                const encontrado = produtos.find(
                    (produto) => String(produto.id) === String(id)
                );

                if (!encontrado) {
                    throw new Error("Produto não encontrado.");
                }

                setProduto(encontrado);
            })
            .catch(() => {
                setErro("Produto não encontrado.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [id]);

    if (carregando) {
        return <p>Carregando produto...</p>;
    }

    if (erro) {
        return (
            <main>
                <p>{erro}</p>

                <button onClick={() => router.push("/produtos")}>
                    Voltar para Produtos
                </button>
            </main>
        );
    }

    return (
        <main>
            <h1>Detalhes do Produto</h1>

            <p>Produto: {produto.nome}</p>

            <p>ID: {produto.id}</p>

            <p>Preço: R$ {produto.preco.toFixed(2)}</p>

            <button onClick={() => router.push("/produtos")}>
                Voltar para Produtos
            </button>
        </main>
    );
}