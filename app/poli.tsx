"use client";

import Link from "next/link";

export default function PoliticaTrocasPage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img
              src="/layout/logo/logo-horizontal.png"
              alt="QUADRAKING STORE"
              className="h-10 w-auto"
            />
          </Link>
          <Link href="/" className="text-sm text-slate-200 hover:text-yellow-400">
            Voltar à loja
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-6 md:p-10 shadow-2xl">
          <p className="text-yellow-400 text-sm uppercase tracking-[0.25em]">
            Informações
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-8">
            Política de Trocas e Devoluções
          </h1>

          <div className="space-y-8 text-slate-200 leading-7">

            <div>
              <h2 className="text-xl font-black text-white mb-3">
                1. Prazo para troca ou devolução
              </h2>
              <p>
                O cliente tem até <strong className="text-white">7 dias corridos</strong> após o recebimento do produto para solicitar a troca ou devolução, conforme o Código de Defesa do Consumidor (Lei nº 8.078/1990).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-white mb-3">
                2. Condições para troca ou devolução
              </h2>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-yellow-400 mt-1">▸</span>
                  O produto deve estar <strong className="text-white">sem uso</strong>, na embalagem original e com todos os acessórios.
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 mt-1">▸</span>
                  Não serão aceitas trocas de produtos com sinais de uso, sujos ou danificados pelo cliente.
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 mt-1">▸</span>
                  Em caso de defeito de fabricação, o prazo é de <strong className="text-white">30 dias</strong> para produtos não duráveis e <strong className="text-white">90 dias</strong> para produtos duráveis.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-white mb-3">
                3. Como solicitar
              </h2>
              <p>
                Entre em contato pelo nosso WhatsApp{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=5588981495878&text=Oii,+quero+solicitar+uma+troca+ou+devolução!&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline font-semibold"
                >
                  (88) 98149-5878
                </a>{" "}
                informando o número do pedido, o motivo da troca e fotos do produto.
              </p>
              <p className="mt-3">
                Nossa equipe entrará em contato em até <strong className="text-white">1 dia útil</strong> para orientar sobre o processo.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-white mb-3">
                4. Frete de devolução
              </h2>
              <p>
                Em caso de <strong className="text-white">defeito de fabricação</strong>, o frete de devolução é por nossa conta.
              </p>
              <p className="mt-3">
                Em caso de <strong className="text-white">troca por tamanho ou preferência</strong>, o frete de envio do produto de volta é por conta do cliente. O envio do novo produto ao cliente é por nossa conta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-white mb-3">
                5. Reembolso
              </h2>
              <p>
                Caso o produto não esteja disponível para troca, realizamos o <strong className="text-white">reembolso integral</strong> via PIX em até <strong className="text-white">5 dias úteis</strong> após o recebimento do produto devolvido.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-white mb-3">
                6. Produtos sem direito à troca
              </h2>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-yellow-400 mt-1">▸</span>
                  Produtos com sinais de uso ou higiene comprometida.
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 mt-1">▸</span>
                  Produtos danificados por mau uso do cliente.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-5 mt-6">
              <p className="text-white font-black text-lg mb-1">Dúvidas?</p>
              <p className="text-slate-200 text-sm">
                Fale com a gente pelo WhatsApp{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=5588981495878&text=Oii,+tenho+uma+dúvida+sobre+trocas!&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline font-semibold"
                >
                  (88) 98149-5878
                </a>{" "}
                ou pelo e-mail{" "}
                <a
                  href="mailto:contato@quadraking.com.br"
                  className="text-yellow-400 hover:underline font-semibold"
                >
                  contato@quadraking.com.br
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
