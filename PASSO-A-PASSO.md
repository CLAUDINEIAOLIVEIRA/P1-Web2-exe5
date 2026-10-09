# Exercício 5: Mini Loja Online

Este exercício junta tudo o que foi feito nos anteriores: script Node.js (Exercício 1), componentes e props (Exercício 2), useState e useEffect (Exercício 3) e rotas do Next.js (Exercício 4).

## Parte 1: Criando o projeto

**Passo 1. Abra o terminal** na pasta `Exercicio 5` (menu **Terminal > Novo Terminal** ou `Ctrl + '`).

**Passo 2. Crie o projeto Next.js.**

```
npx create-next-app@latest mini-loja
```

Responda às perguntas igual ao Exercício 4: **sem TypeScript**, **sem Tailwind**, **sem `src/`** e **com App Router**.

**Passo 3. Entre na pasta e abra no VS Code.**

```
cd mini-loja
code .
```

**Passo 4. Limpe os arquivos de exemplo.**

- Apague o arquivo `app/page.module.css`.
- Apague os arquivos `.svg` da pasta `public`.
- Apague todo o conteúdo de `app/globals.css` (vamos escrever o nosso no Passo 14).

## Parte 2: O script que gera os produtos

**Passo 5. Na raiz do projeto** (ao lado do `package.json`), crie o arquivo `gerar-produtos.js`:

```js
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
```

> **Por que `require` e não `import`?** O `package.json` do Next.js não tem `"type": "module"`, então o Node trata os arquivos `.js` soltos no formato antigo (CommonJS), que usa `require`. O site em si continua usando `import` normalmente.

> **Por que o arquivo vai para a pasta `public`?** Tudo o que está em `public` pode ser acessado direto pelo navegador. Assim, `public/produtos.json` fica disponível em `http://localhost:3000/produtos.json`, e a página de produtos consegue buscá-lo com `fetch`.

> **Por que os ids começam em 101?** Para o endereço `/produtos/101`, citado no enunciado, funcionar.

**Passo 6. Rode o script.**

```
node gerar-produtos.js 5
```

Deve aparecer `Arquivo public/produtos.json criado com 5 produtos.` Abra o arquivo `public/produtos.json` para ver os produtos. Se rodar sem número (`node gerar-produtos.js`), aparece a mensagem pedindo a quantidade.

## Parte 3: Os componentes

**Passo 7. Crie a pasta `components`** na raiz do projeto (ao lado de `app`) e, dentro dela, o arquivo `Navbar.js`:

```jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/sobre">Sobre</Link>
      <Link href="/produtos">Produtos</Link>
    </nav>
  );
}
```

**Passo 8. Crie o arquivo `components/Container.js`:**

```jsx
export default function Container({ titulo, children }) {
  return (
    <section className="container">
      <h2>{titulo}</h2>
      <div className="caixa">{children}</div>
    </section>
  );
}
```

> O `children` é tudo o que for colocado entre `<Container>` e `</Container>`, igual ao Exercício 2.

**Passo 9. Crie o arquivo `components/ProdutoCard.js`:**

```jsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProdutoCard({ id, nome, preco }) {
  // Cada cartão tem o seu próprio contador de quantidade
  const [quantidade, setQuantidade] = useState(0);

  function incrementar() {
    setQuantidade(quantidade + 1);
  }

  function decrementar() {
    // Não deixa a quantidade ficar negativa
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  }

  return (
    <div className="card">
      <h3>{nome}</h3>
      <p className="preco">R$ {preco.toFixed(2).replace(".", ",")}</p>

      <div className="quantidade">
        <button onClick={decrementar}>-</button>
        <span>{quantidade}</span>
        <button onClick={incrementar}>+</button>
      </div>

      <Link href={`/produtos/${id}`}>Ver detalhes</Link>
    </div>
  );
}
```

> **O que é `"use client"`?** No Next.js, os componentes rodam no servidor por padrão, e lá não existem cliques nem `useState`. A linha `"use client"` (sempre na **primeira linha** do arquivo) diz que esse componente roda no navegador. Precisamos dela sempre que usamos `useState`, `useEffect` ou `onClick`.

> **Por que cada cartão tem o seu contador?** Cada `<ProdutoCard>` na tela é uma cópia separada do componente, com o seu próprio `useState`. Clicar no **+** de um cartão não muda os outros.

> **O que faz `toFixed(2).replace(".", ",")`?** Deixa o preço com 2 casas decimais e troca o ponto pela vírgula, no formato brasileiro: `18.5` vira `18,50`.

## Parte 4: As páginas

**Passo 10. Substitua todo o conteúdo de `app/layout.js`** para a Navbar aparecer em todas as páginas:

```jsx
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Mini Loja",
  description: "Mini loja online feita com Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**Passo 11. Substitua o conteúdo de `app/page.js`** (Home) e crie `app/sobre/page.js` (Sobre).

`app/page.js`:

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Mini Loja</h1>
      <p>Bem-vindo à Mini Loja! Aqui você encontra produtos de todos os tipos.</p>
      <Link href="/produtos" className="botao">
        Ver produtos
      </Link>
    </section>
  );
}
```

`app/sobre/page.js`:

```jsx
export default function Sobre() {
  return (
    <section>
      <h1>Sobre</h1>
      <p>
        A Mini Loja é um projeto de estudo feito com Next.js. Os produtos são
        gerados por um script Node.js e carregados a partir de um arquivo JSON.
      </p>
    </section>
  );
}
```

**Passo 12. Crie a pasta `app/produtos`** e, dentro dela, o arquivo `page.js`:

```jsx
"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import ProdutoCard from "@/components/ProdutoCard";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch("/produtos.json");

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        setError(erro.message);
      } finally {
        setLoading(false);
      }
    }

    buscarProdutos();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="erro">Erro: {error}</p>;
  }

  return (
    <Container titulo="Nossos Produtos">
      <div className="lista-cards">
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            id={produto.id}
            nome={produto.nome}
            preco={produto.preco}
          />
        ))}
      </div>
    </Container>
  );
}
```

> Este código segue a mesma ideia do Exercício 3.2: três estados (`produtos`, `loading` e `error`), `useEffect` com `[]` para buscar uma vez só, e "Carregando..." enquanto os dados não chegam. A diferença é que agora buscamos o nosso próprio arquivo, `/produtos.json`.

**Passo 13. Dentro de `app/produtos`, crie a pasta `[id]`** (com os colchetes) e, dentro dela, dois arquivos.

O primeiro é o `page.js`:

```jsx
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
```

O segundo é o `loading.js`:

```jsx
// Mostrado enquanto o Next.js lê o id da URL
export default function Loading() {
  return <p>Carregando produto...</p>;
}
```

> **O que é `useParams`?** É o hook do Next.js que lê os parâmetros da URL em um componente com `"use client"`. Em `/produtos/101`, ele devolve `{ id: "101" }`.
> No Exercício 4 usamos `await params` porque lá a página rodava no servidor. Aqui a página precisa de `useState` e `useEffect`, então roda no navegador e usa `useParams`.

> **Por que `Number(id)`?** O `id` da URL é **texto** (`"101"`), mas no JSON ele é **número** (`101`). Sem converter, a comparação `101 === "101"` dá falso e o produto nunca é encontrado.

> **Por que `[id]` no final do `useEffect`?** Assim, se o `id` da URL mudar, a busca roda de novo para o produto certo.

> **Para que serve o `loading.js`?** Igual ao Exercício 4: no Next.js 16, sem ele o `npm run build` dá erro na rota `[id]`.

**Passo 14. Escreva os estilos em `app/globals.css`:**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f2f4f7;
  color: #222;
}

main {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px;
}

/* Navbar */
.navbar {
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  background-color: #1f2937;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
  text-decoration: underline;
}

/* Container */
.container h2 {
  margin: 0 0 12px;
}

.caixa {
  border: 2px solid #4a6cf7;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
}

/* ProdutoCard */
.lista-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 220px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: #fafafa;
}

.card h3 {
  margin: 0 0 8px;
}

.preco {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: bold;
  color: #2e9e44;
}

.quantidade {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.quantidade button {
  width: 36px;
  height: 36px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #4a6cf7;
  color: #fff;
  cursor: pointer;
}

.quantidade button:hover {
  background-color: #3451c9;
}

.quantidade span {
  min-width: 24px;
  font-size: 18px;
  font-weight: bold;
}

.card a {
  color: #4a6cf7;
}

/* Página de detalhes */
.detalhe {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px 24px;
}

.botao {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 18px;
  border-radius: 8px;
  background-color: #4a6cf7;
  color: #fff;
  text-decoration: none;
}

.botao:hover {
  background-color: #3451c9;
}

.erro {
  color: #c62828;
}
```

## Parte 5: Testando

**Passo 15. Rode o projeto.**

```
npm run dev
```

Abra `http://localhost:3000`.

| O que testar | Resultado esperado |
|---|---|
| Clicar em **Home**, **Sobre** e **Produtos** | A página troca sem recarregar |
| Abrir **Produtos** | "Carregando..." rápido e depois os cartões dentro da caixa "Nossos Produtos" |
| Clicar em **+** e **-** em um cartão | Só a quantidade daquele cartão muda, e ela nunca fica negativa |
| Clicar em **Ver detalhes** do primeiro produto | Vai para `/produtos/101` com número, nome e preço |
| Digitar `/produtos/999` na barra de endereço | "Erro: Produto número 999 não encontrado." |
| Clicar em **Voltar para Produtos** | Volta para a listagem |
| Parar o servidor, rodar `node gerar-produtos.js 10` e rodar `npm run dev` de novo | A listagem passa a mostrar 10 produtos |

## Problemas comuns

- **Erro `You're importing a component that needs useState...`**: faltou o `"use client"` na primeira linha do arquivo.
- **"Erro: Não foi possível carregar os produtos."**: o `produtos.json` não existe ou não está na pasta `public`. Rode `node gerar-produtos.js 5`.
- **Erro `require is not defined in ES module scope` ao rodar o script**: o `package.json` ganhou `"type": "module"`. Tire essa linha ou troque o `require` por `import fs from "fs";`.
- **Página de detalhes sempre diz "não encontrado"**: faltou o `Number(id)` na comparação.
- **`npm run build` dá erro na rota `/produtos/[id]`**: faltou o arquivo `loading.js` dentro da pasta `[id]`.
- **Erro dizendo que a execução de scripts foi desabilitada, ao rodar `npm` ou `npx`**: troque o terminal para o **Prompt de Comando (cmd)**, pela setinha ao lado do `+` no terminal do VS Code.

## Entrega

Não coloque as pastas `node_modules` e `.next` no .zip. Elas são grandes e são recriadas com `npm install` e `npm run dev`.
