/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Container reutilizável (titulo + children)
 */

// Container reutilizável: recebe a prop titulo e exibe qualquer conteúdo em children
export default function Container({ titulo, children }) {
  return (
    <section className="container-loja">
      <h2>{titulo}</h2>
      <div className="container-caixa">{children}</div>
    </section>
  );
}
