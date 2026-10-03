"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProdutoCard({ id, nome, preco }) {
    const [quantidade, setQuantidade] = useState(0);

    function aumentar() {
        setQuantidade(quantidade + 1);
    }

    function diminuir() {
        if (quantidade > 0) {
            setQuantidade(quantidade - 1);
        }
    }

    return (
        <div className="produto-card">
            <h3>{nome}</h3>

            <p>ID: {id}</p>

            <p>
                Preço: R$ {preco.toFixed(2)}
            </p>

            <div className="quantidade">
                <button onClick={diminuir}>−</button>

                <span>{quantidade}</span>

                <button onClick={aumentar}>+</button>
            </div>

            <Link href={`/produtos/${id}`}>
                Ver detalhes
            </Link>
        </div>
    );
}