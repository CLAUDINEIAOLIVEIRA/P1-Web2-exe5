export default function Container({ titulo, children }) {
  return (
    <section className="container">
      <h2>{titulo}</h2>
      <div className="caixa">{children}</div>
    </section>
  );
}
