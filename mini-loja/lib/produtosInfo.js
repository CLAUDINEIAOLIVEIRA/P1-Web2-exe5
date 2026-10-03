/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Funções de apoio (preço, emoji, descrição e cor por produto)
 */

// O produtos.json (gerado pelo script) tem somente id, nome e preco.
// Aqui ficam informações de apresentação, associadas ao nome do produto.

const info = {
  "Camiseta": { emoji: "👕", descricao: "Camiseta de algodão macio, corte moderno e ótimo caimento para o dia a dia." },
  "Caneca": { emoji: "☕", descricao: "Caneca de cerâmica resistente, ideal para café, chá e chocolate quente." },
  "Mochila": { emoji: "🎒", descricao: "Mochila espaçosa com compartimento para notebook e tecido resistente à água." },
  "Boné": { emoji: "🧢", descricao: "Boné ajustável com aba curva e tecido leve e respirável." },
  "Fone de Ouvido": { emoji: "🎧", descricao: "Fone de ouvido com graves potentes, almofadas confortáveis e microfone embutido." },
  "Teclado": { emoji: "⌨️", descricao: "Teclado com teclas silenciosas e layout ABNT2, ótimo para estudar e programar." },
  "Mouse": { emoji: "🖱️", descricao: "Mouse sem fio com sensor preciso e design ergonômico." },
  "Caderno": { emoji: "📓", descricao: "Caderno universitário de capa dura com folhas pautadas de alta gramatura." },
  "Garrafa": { emoji: "🧴", descricao: "Garrafa térmica que mantém a bebida gelada por até 12 horas." },
  "Relógio": { emoji: "⌚", descricao: "Relógio com pulseira ajustável, resistente à água e visor de fácil leitura." },
};

const padrao = { emoji: "🛍️", descricao: "Produto de qualidade selecionado pela Mini Loja." };

// Nomes repetidos pelo script ganham um número no final (ex.: "Camiseta 2")
function nomeBase(nome) {
  return nome.replace(/\s\d+$/, "");
}

export function infoProduto(nome) {
  return info[nomeBase(nome)] || padrao;
}

export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Cor de fundo diferente para cada id
export function gradientePorId(id) {
  const matiz = (Number(id) * 47) % 360;
  return `linear-gradient(135deg, hsl(${matiz}, 70%, 55%), hsl(${(matiz + 40) % 360}, 70%, 40%))`;
}
