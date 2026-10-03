Mini Loja Online

Crie um projeto Next.js chamado mini-loja, com as seguintes características:
Crie um script Node.js (gerar-produtos.js) que recebe pelo terminal a quantidade de produtos a gerar (ex: node gerar-produtos.js 5) e cria um arquivo produtos.json contendo essa quantidade de produtos fictícios, cada um com id, nome e preco.
A partir desses dados, construa um site com uma página inicial, uma página "Sobre" e uma página "Produtos", navegáveis por um menu (Navbar) reutilizável, usando o componente <Link/> do Next.js, sem recarregar a página a cada clique.
Na página de Produtos, carregue a lista do produtos.json (usando useEffect, com estados de carregamento e erro) e exiba cada produto dentro de um componente ProdutoCard, recebendo nome, preco e id via props. Envolva toda a listagem num componente Container, reutilizável, que recebe uma prop titulo e exibe qualquer conteúdo passado como children. Cada ProdutoCard deve ter um contador de quantidade próprio, controlado com useState, com botões de incrementar e decrementar.
Por fim, crie uma rota dinâmica para que, ao acessar por exemplo /produtos/101, a página leia o parâmetro da URL e exiba os detalhes daquele produto específico, com um botão para voltar à listagem completa.

