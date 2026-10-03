/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Script que gera o produtos.json
 */

// Uso: node gerar-produtos.js 5
// Gera public/produtos.json com a quantidade de produtos informada.
const fs = require("fs");
const path = require("path");

const quantidade = parseInt(process.argv[2], 10);

if (!Number.isInteger(quantidade) || quantidade <= 0) {
  console.log("Informe a quantidade de produtos. Exemplo: node gerar-produtos.js 5");
  process.exit(1);
}

const nomes = ["Camiseta", "Caneca", "Mochila", "Boné", "Fone de Ouvido", "Teclado", "Mouse", "Caderno", "Garrafa", "Relógio"];

const produtos = [];
for (let i = 0; i < quantidade; i++) {
  produtos.push({
    id: 101 + i,
    nome: `${nomes[i % nomes.length]}${i >= nomes.length ? " " + (Math.floor(i / nomes.length) + 1) : ""}`,
    preco: Number((Math.random() * 190 + 10).toFixed(2)),
  });
}

// Salvo em public/ para que o Next.js sirva o arquivo em /produtos.json
const destino = path.join(__dirname, "public", "produtos.json");
fs.writeFileSync(destino, JSON.stringify(produtos, null, 2));
console.log(`${quantidade} produtos gerados em ${destino}`);
