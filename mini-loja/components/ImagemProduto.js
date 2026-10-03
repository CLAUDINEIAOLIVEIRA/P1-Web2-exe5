/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Imagem ilustrativa do produto (emoji sobre fundo colorido)
 */

import { infoProduto, gradientePorId } from "../lib/produtosInfo";

export default function ImagemProduto({ id, nome, grande = false }) {
  return (
    <div
      className={grande ? "imagem-produto grande" : "imagem-produto"}
      style={{ background: gradientePorId(id) }}
      role="img"
      aria-label={nome}
    >
      <span>{infoProduto(nome).emoji}</span>
    </div>
  );
}
