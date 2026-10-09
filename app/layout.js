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
