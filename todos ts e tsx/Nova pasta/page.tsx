"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { produtos, TAMANHOS_EXIBIDOS } from "@/src/data/produtos";
import { formatMoney } from "@/src/lib/cart";

const thumbnails: Record<string, string> = {
  nikeairzoomgtcut3: "/layout/thumbnails/nikeairzoomgtcut3.png",
  nikeajawilsonaone: "/layout/thumbnails/nikeajawilsonaone.png",
  nikefreak7: "/layout/thumbnails/nikefreak7.png",
  nikeja3: "/layout/thumbnails/nikeja3.png",
  nikekd18: "/layout/thumbnails/nikekd18.png",
  nikekyrie5spongebob: "/layout/thumbnails/nikekyrie5spongebob.png",
  nikelebronwitness8: "/layout/thumbnails/nikelebronwitness8.png",
  nikemind002: "/layout/thumbnails/nikemind002.png",
  nikesabrina2: "/layout/thumbnails/nikesabrina2.png",
  nikesabrina3: "/layout/thumbnails/nikesabrina3.png",
  pumalamelomb04: "/layout/thumbnails/pumalamelomb04.png",
  underarmourcurry8: "/layout/thumbnails/underarmourcurry8.png",
};

function embaralhar<T>(lista: T[]) {
  return [...lista].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [filtroTamanho, setFiltroTamanho] = useState<number | null>(null);
  const [seed, setSeed] = useState(0);

  const produtosFiltrados = useMemo(() => {
    const lista = produtos.filter((produto) => {
      if (!filtroTamanho) return true;

      return produto.colorways.some((colorway) =>
        colorway.tamanhosDisponiveis.includes(filtroTamanho)
      );
    });

    if (!filtroTamanho) return lista;

    return embaralhar(lista);
  }, [filtroTamanho, seed]);

  const trocarTamanho = (valor: string) => {
    setFiltroTamanho(valor ? Number(valor) : null);
    setSeed((atual) => atual + 1);
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <img
            src="/layout/logo/logo-horizontal.png"
            alt="QUADRAKING STORE"
            className="h-10 w-auto"
          />

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200">
            <a href="#produtos" className="hover:text-yellow-400 transition">
              Produtos
            </a>
            <a href="#confianca" className="hover:text-yellow-400 transition">
              Confiança
            </a>
            <Link href="/carrinho" className="hover:text-yellow-400 transition">
              Carrinho
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="rounded-3xl overflow-hidden border border-yellow-500/20 shadow-2xl bg-slate-950/70">
          <img
            src="/layout/hero/hero-home.png"
            alt="Banner principal QUADRAKING STORE"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section id="produtos" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-yellow-400 text-sm uppercase tracking-[0.25em]">
              Catálogo
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
              Modelos em destaque
            </h2>
          </div>

          <span className="text-sm text-slate-300">
            {produtosFiltrados.length} modelos
          </span>
        </div>

        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <p className="text-sm font-semibold text-white">
            Ver modelos no meu tamanho:
          </p>

          <select
            value={filtroTamanho ?? ""}
            onChange={(e) => trocarTamanho(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 w-full md:w-48"
          >
            <option value="">Todos</option>
            {TAMANHOS_EXIBIDOS.map((tamanho) => (
              <option key={tamanho} value={tamanho}>
                {tamanho}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => {
            const thumb =
              thumbnails[produto.slug] || produto.colorways[0]?.imagens[0] || "";

            const menorPreco = Math.min(...produto.colorways.map((c) => c.preco));

            return (
              <Link
                key={produto.slug}
                href={`/produto/${produto.slug}`}
                className="group relative rounded-3xl border border-slate-700/70 bg-slate-950/80 p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-2xl overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.15),transparent_60%)]" />

                <div className="relative z-10 rounded-2xl bg-slate-900/80 overflow-hidden flex items-center justify-center h-[240px]">
                  <img
                    src={thumb}
                    alt={produto.nome}
                    className="max-h-[200px] w-auto object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="relative z-10 mt-5">
                  <h3 className="text-xl font-black text-white">
                    {produto.nome}
                  </h3>

                  <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                    {produto.descricao}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-sm text-yellow-400 font-semibold">
                      {produto.colorways.length} colorway
                      {produto.colorways.length > 1 ? "s" : ""}
                    </span>

                    <span className="text-2xl font-black text-white">
                      {formatMoney(menorPreco)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="confianca" className="max-w-7xl mx-auto px-4 pb-14">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-6 md:p-8 shadow-lg">
          <div className="text-center mb-8">
            <p className="text-yellow-400 text-sm uppercase tracking-[0.25em]">
              Confiança
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              Compra com mais segurança
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 place-items-center">
            <img src="/layout/confianca/entrega.png" alt="Enviamos para todo o Brasil" className="w-full max-w-[210px]" />
            <img src="/layout/confianca/atendimento.png" alt="Atendimento rápido" className="w-full max-w-[210px]" />
            <img src="/layout/confianca/seguranca.png" alt="Compra segura" className="w-full max-w-[210px]" />
            <img src="/layout/confianca/pix.png" alt="Pagamento via PIX" className="w-full max-w-[210px]" />
          </div>
        </div>
      </section>
    </main>
  );
}