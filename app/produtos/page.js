"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import ProdutoCard from "../../components/ProdutoCard";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
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
            .then((dados) => {
                setProdutos(dados);
            })
            .catch(() => {
                setErro("Não foi possível carregar os produtos.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    return (
        <>
            <Navbar />

            <main>
                <Container titulo="Nossos Produtos">
                    {carregando && <p>Carregando produtos...</p>}

                    {erro && <p>{erro}</p>}

                    {!carregando && !erro && (
                        <div className="produtos-grid">
                            {produtos.map((produto) => (
                                <ProdutoCard
                                    key={produto.id}
                                    id={produto.id}
                                    nome={produto.nome}
                                    preco={produto.preco}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </main>
        </>
    );
}