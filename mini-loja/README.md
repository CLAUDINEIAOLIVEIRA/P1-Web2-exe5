# P1 - Programação e Design para Web II

**Aluno:** Willian
**Matrícula:** 2521560991008
**Professora:** Claudineia Moreira de Oliveira
**Disciplina:** T303 - Programação e Design para Web II
**Avaliação:** P1 | **Data:** 02/10/2026 | **Valor:** 6,0

## Questão 5 - Mini Loja Online (2,0)

Projeto Next.js chamado `mini-loja`:

- `gerar-produtos.js`: recebe pelo terminal a quantidade (ex.: `node gerar-produtos.js 5`) e cria o `produtos.json` com `id`, `nome` e `preco`. O arquivo fica em `public/produtos.json`.
- Site com página inicial, "Sobre" e "Produtos", com `Navbar` reutilizável usando `<Link/>`.
- Página de Produtos carrega o `produtos.json` com `useEffect`, com estados de carregamento e erro, e exibe cada item em um `ProdutoCard` (props `nome`, `preco`, `id`).
- A listagem fica dentro do `Container` reutilizável (prop `titulo` e `children`).
- Cada `ProdutoCard` tem contador de quantidade próprio (`useState`) com botões de incrementar e decrementar.
- Rota dinâmica `/produtos/101` lê o parâmetro da URL e mostra os detalhes do produto, com botão para voltar à listagem.

## Estrutura e visual
- `lib/produtosInfo.js`: formata o preço e associa emoji e descrição ao nome do produto. O `produtos.json` continua só com `id`, `nome` e `preco`, como pede o enunciado.
- `components/ImagemProduto.js`: imagem ilustrativa (emoji sobre fundo colorido, sem arquivos externos).
- `components/ProdutoCard.js`: card com ID, nome, preço, contador de quantidade (botão "-" desativado em 0) e subtotal.
- `app/produtos/[id]/page.js`: lê o `id` da URL e mostra imagem, preço e descrição, com botão para voltar à listagem.

## Como executar
```bash
npm install
node gerar-produtos.js 5
npm run dev
```
