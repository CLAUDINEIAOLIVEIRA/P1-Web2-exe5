const fs = require("fs");

const quantidade = Number(process.argv[2]);

if (!quantidade || quantidade <= 0) {
    console.log("Informe uma quantidade válida de produtos.");
    console.log("Exemplo: node gerar-produtos.js 5");
    process.exit(1);
}

const produtos = [];

for (let i = 0; i < quantidade; i++) {
    produtos.push({
        id: 101 + i,
        nome: `Produto ${101 + i}`,
        preco: Number((19.90 + i * 10).toFixed(2))
    });
}

fs.writeFileSync(
    "produtos.json",
    JSON.stringify(produtos, null, 2)
);

console.log(`${quantidade} produtos gerados com sucesso!`);