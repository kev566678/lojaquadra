import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import MetaPixel from "@/src/components/MetaPixel";
import FloatingWhatsapp from "@/src/components/FloatingWhatsapp";

export const metadata: Metadata = {
  title: "QUADRAKING STORE — Tênis de Basquete",
  description: "Loja especializada em tênis de basquete com os melhores modelos e preços. Entrega para todo o Brasil via Sedex.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <MetaPixel />
        {children}
        <FloatingWhatsapp />

        <footer className="bg-slate-950 border-t border-slate-800 mt-10">
          <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

              <div>
                <img
                  src="/layout/logo/logo-horizontal.png"
                  alt="QUADRAKING STORE"
                  className="h-10 w-auto mb-4"
                />
                <p className="text-slate-400 text-sm leading-6">
                  Especialistas em tênis de basquete. Produtos originais, entrega rápida e atendimento personalizado.
                </p>
              </div>

              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                  Links úteis
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link href="/" className="hover:text-yellow-400 transition">Produtos</Link></li>
                  <li><Link href="/carrinho" className="hover:text-yellow-400 transition">Carrinho</Link></li>
                  <li><Link href="/checkout" className="hover:text-yellow-400 transition">Checkout</Link></li>
                  <li><Link href="/politica-de-trocas" className="hover:text-yellow-400 transition">Política de Trocas e Devoluções</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                  Contato
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5588981495878&text=Oii,+vim+do+site,+quero+concluir+por+aqui+mesmo!&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-400 transition"
                    >
                      📱 (88) 98149-5878
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contato@quadraking.com.br" className="hover:text-yellow-400 transition">
                      ✉️ contato@quadraking.com.br
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/quadrakingstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-400 transition"
                    >
                      📸 @quadrakingstore
                    </a>
                  </li>
                  <li className="text-slate-500">🕐 Atendimento: Seg–Sáb, 8h–20h</li>
                </ul>
              </div>

            </div>

            <div className="border-t border-slate-800 pt-6 mb-6">
              <div className="flex flex-wrap gap-4 justify-center text-xs text-slate-500">
                <span>🔒 Site seguro (HTTPS)</span>
                <span>📦 Entrega via Sedex para todo o Brasil</span>
                <span>💰 Pagamento via PIX</span>
                <span>🔄 Trocas em até 7 dias</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600 space-y-1">
              <p>Razão Social: Kataia Industria e Comercio de Calcados LTDA — Nome Fantasia: Ceara Calcados</p>
              <p>CNPJ: 06.847.704/0001-80</p>
              <p>
                Instagram:{" "}
                <a
                  href="https://instagram.com/quadrakingstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition"
                >
                  @quadrakingstore
                </a>
              </p>
              <p>© {new Date().getFullYear()} QUADRAKING STORE. Todos os direitos reservados.</p>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}
