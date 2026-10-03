/**
 * P1 - T303 - Programação e Design para Web II
 * Professora: Claudineia Moreira de Oliveira
 * Aluno: Willian | Matrícula: 2521560991008
 * Questão 5: Layout raiz com Navbar e rodapé
 */

import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = { title: "Mini Loja" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="conteudo">{children}</main>
        <footer className="rodape">
          Willian - T303 - Programação e Design para Web II - P1
        </footer>
      </body>
    </html>
  );
}
