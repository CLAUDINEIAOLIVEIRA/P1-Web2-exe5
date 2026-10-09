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

**Passo 14. Escreva os estilos em `app/globals.css`:** este CSS dá ao site a aparência de loja, sem precisar mudar nada no JSX.

```css
/* Cores da loja: mudando aqui, muda o site inteiro */
:root {
  --cor-principal: #ff5a36;
  --cor-principal-escura: #e0441f;
  --cor-texto: #1d1d35;
  --cor-texto-suave: #6b6b80;
  --cor-fundo: #f6f5f2;
  --cor-cartao: #ffffff;
  --cor-borda: #e8e6e1;
  --cor-preco: #1d1d35;
  --sombra: 0 2px 10px rgba(29, 29, 53, 0.08);
  --sombra-forte: 0 10px 28px rgba(29, 29, 53, 0.16);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
}

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 16px;
}

h1 {
  font-size: 32px;
  margin: 0 0 12px;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 16px 32px;
  background-color: var(--cor-cartao);
  box-shadow: var(--sombra);
}

/* Nome da loja no canto esquerdo do menu */
.navbar::before {
  content: "MINI LOJA";
  margin-right: auto;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--cor-principal);
}

.navbar a {
  position: relative;
  color: var(--cor-texto);
  text-decoration: none;
  font-weight: 600;
  padding: 4px 0;
}

/* Linha que aparece embaixo do link ao passar o mouse */
.navbar a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: var(--cor-principal);
  transition: width 0.2s;
}

.navbar a:hover::after {
  width: 100%;
}

/* Home: a seção com título, texto e botão vira um banner */
section:has(> h1 + p + .botao) {
  padding: 64px 40px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  background: linear-gradient(135deg, #1d1d35 0%, #3a2d5c 55%, #ff5a36 130%);
  box-shadow: var(--sombra-forte);
}

section:has(> h1 + p + .botao) h1 {
  font-size: 44px;
}

section:has(> h1 + p + .botao) p {
  font-size: 18px;
  color: #fff;
  opacity: 0.85;
  margin: 0 0 8px;
}

section:has(> h1 + p + .botao) .botao {
  padding: 14px 32px;
  font-size: 17px;
}

/* Sobre e demais textos */
main > section > p {
  font-size: 17px;
  line-height: 1.6;
  color: var(--cor-texto-suave);
}

/* Container */
.container h2 {
  margin: 0 0 20px;
  font-size: 28px;
}

/* Tracinho colorido embaixo do título */
.container h2::after {
  content: "";
  display: block;
  width: 56px;
  height: 4px;
  margin-top: 8px;
  border-radius: 2px;
  background-color: var(--cor-principal);
}

.caixa {
  padding: 0;
}

/* ProdutoCard */
.lista-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 24px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 0 0 20px;
  border: 1px solid var(--cor-borda);
  border-radius: 16px;
  overflow: hidden;
  text-align: center;
  background-color: var(--cor-cartao);
  box-shadow: var(--sombra);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sombra-forte);
}

/* Área de "foto" do produto, feita só com CSS */
.card::before {
  content: "";
  display: block;
  height: 150px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffd6c9, #ff9f80);
}

/* Cada cartão ganha uma cor diferente, repetindo a cada 4 */
.card:nth-child(4n + 2)::before {
  background: linear-gradient(135deg, #d4e4ff, #8fb3ff);
}

.card:nth-child(4n + 3)::before {
  background: linear-gradient(135deg, #d6f5e3, #7fd6a6);
}

.card:nth-child(4n + 4)::before {
  background: linear-gradient(135deg, #f1dcff, #c49bff);
}

.card h3 {
  margin: 0 16px 6px;
  font-size: 18px;
}

.preco {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 800;
  color: var(--cor-preco);
}

.quantidade {
  display: inline-flex;
  align-items: center;
  align-self: center;
  margin-bottom: 16px;
  border: 1px solid var(--cor-borda);
  border-radius: 999px;
  overflow: hidden;
}

.quantidade button {
  width: 40px;
  height: 36px;
  font-size: 18px;
  border: none;
  background-color: transparent;
  color: var(--cor-texto);
  cursor: pointer;
  transition: background-color 0.2s;
}

.quantidade button:hover {
  background-color: var(--cor-fundo);
}

.quantidade span {
  min-width: 32px;
  font-size: 16px;
  font-weight: 700;
}

/* "Ver detalhes" vira um botão */
.card a {
  margin: 0 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--cor-texto);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.card a:hover {
  background-color: var(--cor-principal);
}

/* Página de detalhes */
.detalhe {
  max-width: 480px;
  padding: 8px 28px;
  border: 1px solid var(--cor-borda);
  border-radius: 16px;
  background-color: var(--cor-cartao);
  box-shadow: var(--sombra);
}

.detalhe p {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin: 0;
  padding: 16px 0;
  font-size: 17px;
  border-bottom: 1px solid var(--cor-borda);
}

.detalhe p:last-child {
  border-bottom: none;
  font-size: 22px;
  font-weight: 800;
}

.detalhe strong {
  font-weight: 600;
  color: var(--cor-texto-suave);
}

.detalhe p:last-child strong {
  font-size: 17px;
}

/* Botões gerais */
.botao {
  display: inline-block;
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: var(--cor-principal);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
}

.botao:hover {
  background-color: var(--cor-principal-escura);
  transform: translateY(-2px);
}

.erro {
  padding: 16px;
  border-radius: 10px;
  background-color: #fdecea;
  color: #c62828;
}

/* Celular */
@media (max-width: 600px) {
  .navbar {
    flex-wrap: wrap;
    gap: 8px 20px;
    padding: 14px 16px;
  }

  /* No celular, o nome da loja fica sozinho na primeira linha */
  .navbar::before {
    width: 100%;
    font-size: 18px;
    letter-spacing: 1px;
  }

  section:has(> h1 + p + .botao) {
    padding: 40px 20px;
  }

  section:has(> h1 + p + .botao) h1 {
    font-size: 32px;
  }
}
```

> **O que tem de novo nesse CSS?**
>
> - **Variáveis (`--cor-principal` etc.)**: as cores ficam definidas uma vez só no `:root`. Para mudar a cor da loja, basta trocar ali.
> - **`::before` e `::after`**: criam elementos "de enfeite" só com CSS. Usamos para o nome "MINI LOJA" no menu, a linha embaixo dos links, o tracinho do título e a área colorida no topo de cada cartão.
> - **`:nth-child(4n + 2)`**: escolhe cartões pela posição (2º, 6º, 10º...), para cada um ter uma cor diferente.
> - **`section:has(> h1 + p + .botao)`**: seleciona a seção que tem título, texto e botão, ou seja, a Home, e transforma em um banner.
> - **`display: grid` com `auto-fill`**: os cartões se ajeitam sozinhos em quantas colunas couberem na tela.
> - **`@media (max-width: 600px)`**: regras que só valem em telas pequenas, como o celular.

## Parte 5: Testando

**Passo 15. Rode o projeto.**

```
npm run dev
```

Abra `http://localhost:3000`.

| O que testar | Resultado esperado |
|---|---|
| Clicar em **Home**, **Sobre** e **Produtos** | A página troca sem recarregar |
| Abrir **Produtos** | "Carregando..." rápido e depois o título "Nossos Produtos" e os cartões em grade |
| Passar o mouse sobre um cartão | O cartão sobe um pouco e ganha sombra |
| Clicar em **+** e **-** em um cartão | Só a quantidade daquele cartão muda, e ela nunca fica negativa |
| Clicar em **Ver detalhes** do primeiro produto | Vai para `/produtos/101` com número, nome e preço |
| Digitar `/produtos/999` na barra de endereço | "Erro: Produto número 999 não encontrado." |
| Clicar em **Voltar para Produtos** | Volta para a listagem |
| Parar o servidor, rodar `node gerar-produtos.js 10` e rodar `npm run dev` de novo | A listagem passa a mostrar 10 produtos |

## Como rodar o projeto baixado do GitHub

A pasta `node_modules` não vai para o GitHub, então depois de baixar o projeto é preciso instalar as dependências uma vez.

**1. Baixe o repositório.** Pode ser pelo botão verde **Code > Download ZIP** no GitHub (depois extraia o .zip) ou pelo terminal:

```
git clone https://github.com/CLAUDINEIAOLIVEIRA/P1-Web2-exe5
```

**2. Entre na pasta do projeto.** 

```
cd P1-Web2-exe5
```

**3. Instale as dependências e rode.**

```
npm install
npm run dev
```

Abra `http://localhost:3000` no navegador. O arquivo `public/produtos.json` já vem com 5 produtos; para gerar outra quantidade, rode `node gerar-produtos.js 10` antes do `npm run dev`.

## Problemas comuns

- **Erro `Não foi possível encontrar um parâmetro posicional que aceite o argumento` ao usar `cd`**: o nome da pasta tem espaço (por exemplo, `Exercicio 1`). Coloque o caminho entre aspas: `cd "Exercicio 1"`. Outra forma é digitar o começo do nome e apertar **Tab**, que o terminal completa e coloca as aspas sozinho.
- **Erro `Não é possível localizar o caminho ... porque ele não existe` ao usar `cd`**: o terminal está em outra pasta. Veja o caminho que aparece antes do `>` no terminal. Para subir uma pasta, use `cd ..`.
- **Erro `You're importing a component that needs useState...`**: faltou o `"use client"` na primeira linha do arquivo.
- **"Erro: Não foi possível carregar os produtos."**: o `produtos.json` não existe ou não está na pasta `public`. Rode `node gerar-produtos.js 5`.
- **Erro `require is not defined in ES module scope` ao rodar o script**: o `package.json` ganhou `"type": "module"`. Tire essa linha ou troque o `require` por `import fs from "fs";`.
- **Página de detalhes sempre diz "não encontrado"**: faltou o `Number(id)` na comparação.
- **`npm run build` dá erro na rota `/produtos/[id]`**: faltou o arquivo `loading.js` dentro da pasta `[id]`.
- **Erro dizendo que a execução de scripts foi desabilitada, ao rodar `npm` ou `npx`**: troque o terminal para o **Prompt de Comando (cmd)**, pela setinha ao lado do `+` no terminal do VS Code.

## Entrega

Não coloque as pastas `node_modules` e `.next` no .zip. Elas são grandes e são recriadas com `npm install` e `npm run dev`.
