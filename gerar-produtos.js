// Script Node.js: node gerar-produtos.js 5
// Cria o arquivo public/produtos.json com a quantidade de produtos pedida
const fs = require("fs");

const quantidade = Number(process.argv[2]);

if (!Number.isInteger(quantidade) || quantidade < 1) {
  console.log("Informe a quantidade de produtos. Exemplo: node gerar-produtos.js 5");
  process.exit(1);
}

const tipos = ["Camiseta", "Caneca", "Mochila", "Boné", "Caderno", "Garrafa", "Fone", "Relógio"];
const detalhes = ["Azul", "Verde", "Cinza", "Premium", "Grande", "Especial", "Simples", "Infantil"];

function sortear(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

const produtos = [];

for (let i = 0; i < quantidade; i++) {
  produtos.push({
    id: 101 + i, // começa em 101 para a URL /produtos/101 funcionar
    nome: `${sortear(tipos)} ${sortear(detalhes)}`,
    preco: Number((Math.random() * 190 + 10).toFixed(2)), // entre 10 e 200 reais
  });
}

// O arquivo fica na pasta public para o site conseguir buscá-lo em /produtos.json
fs.writeFileSync("public/produtos.json", JSON.stringify(produtos, null, 2));

console.log(`Arquivo public/produtos.json criado com ${quantidade} produtos.`);
