"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { produtos, TAMANHOS_EXIBIDOS } from "@/src/data/produtos";
import { formatMoney } from "@/src/lib/cart";

function embaralhar<T>(lista: T[]) {
  return [...lista].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [filtroTamanho, setFiltroTamanho] = useState<number | null>(null);
  const [busca, setBusca] = useState("");
  // Começa com a lista original (sem embaralhar) para SSR e hidratação coincidirem
  const [produtosOrdenados, setProdutosOrdenados] = useState(produtos);

  // Embaralha apenas no cliente, após a hidratação
  useEffect(() => {
    setProdutosOrdenados(embaralhar(produtos));
  }, []);

  const produtosFiltrados = useMemo(() => {
    let lista = produtosOrdenados;

    if (busca.trim()) {
      const termo = busca.trim().toLowerCase();
      lista = lista.filter((produto) =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.colorways.some((colorway) =>
          colorway.nome.toLowerCase().includes(termo)
        )
      );
    }

    if (filtroTamanho) {
      lista = lista.filter((produto) =>
        produto.colorways.some((colorway) =>
          colorway.tamanhosDisponiveis.includes(filtroTamanho)
        )
      );
    }

    return lista;
  }, [filtroTamanho, busca, produtosOrdenados]);

  const trocarTamanho = (valor: string) => {
    setFiltroTamanho(valor ? Number(valor) : null);
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
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/layout/hero/hero-home-mobile.png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/layout/hero/hero-home.png"
            />
            <img
              src="/layout/hero/hero-home.png"
              alt="Banner principal QUADRAKING STORE"
              className="w-full object-cover"
            />
          </picture>
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
            {produtosFiltrados.reduce((total, p) => total + p.colorways.length, 0)} opções disponíveis
          </span>
        </div>

        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          {/* Busca por nome */}
          <div
            className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            style={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2} style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar tênis ou colorway..."
              style={{
                backgroundColor: "transparent",
                color: "#f8fafc",
                WebkitTextFillColor: "#f8fafc",
                border: "none",
                outline: "none",
                width: "100%",
              }}
              className="text-sm placeholder:text-slate-500"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca("")}
                className="text-slate-500 hover:text-white text-lg leading-none"
                style={{ flexShrink: 0 }}
              >
                ×
              </button>
            )}
          </div>

          {/* Filtro por tamanho */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <p className="text-sm font-semibold text-white whitespace-nowrap">
              Meu tamanho:
            </p>
            <select
              value={filtroTamanho ?? ""}
              onChange={(e) => trocarTamanho(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 w-32"
            >
              <option value="">Todos</option>
              {TAMANHOS_EXIBIDOS.map((tamanho) => (
                <option key={tamanho} value={tamanho}>
                  {tamanho}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => {
            // thumbnail agora vem direto do produto — sem mapa duplicado
            const thumb = produto.thumbnail || produto.colorways[0]?.imagens[0] || "";
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
