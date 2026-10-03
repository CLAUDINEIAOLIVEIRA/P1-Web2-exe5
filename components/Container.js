export default function Container({ titulo, children }) {
    return (
        <section className="container">
            <h2>{titulo}</h2>

            <div className="container-content">
                {children}
            </div>
        </section>
    );
}