"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CART_KEY,
  CartItem,
  calcularResumoCarrinho,
  formatMoney,
} from "@/src/lib/cart";
import { trackMetaCustomEvent } from "@/src/lib/metaPixel";

export default function CarrinhoPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const carrinho: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    setItems(carrinho);

    trackMetaCustomEvent("ViewCart", {
      items_count: carrinho.length,
    });

    const timer = setTimeout(() => {
      if (carrinho.length > 0) {
        trackMetaCustomEvent("CartAbandonedIntent", {
          items_count: carrinho.length,
        });
      }
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const salvarCarrinho = (novoCarrinho: CartItem[]) => {
    setItems(novoCarrinho);
    localStorage.setItem(CART_KEY, JSON.stringify(novoCarrinho));
  };

  const atualizarQuantidade = (id: string, quantidade: number) => {
    if (quantidade < 1) return;

    const atualizado = items.map((item) =>
      item.id === id ? { ...item, quantidade } : item
    );

    salvarCarrinho(atualizado);
  };

  const removerItem = (id: string) => {
    salvarCarrinho(items.filter((item) => item.id !== id));
  };

  const resumo = calcularResumoCarrinho(items);

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
            Continuar comprando
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-yellow-400 text-sm uppercase tracking-[0.25em]">
          Carrinho
        </p>

        <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-8">
          Seus produtos
        </h1>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-8 text-center">
            <p className="text-white text-lg font-bold">Seu carrinho está vazio.</p>

            <Link
              href="/"
              className="inline-block mt-5 rounded-2xl bg-yellow-400 text-slate-950 px-8 py-4 font-black"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4 flex items-center gap-4"
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    style={{
                      width: "72px",
                      height: "72px",
                      objectFit: "contain",
                      flexShrink: 0,
                      background: "#020617",
                      borderRadius: "14px",
                      padding: "4px",
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h2 className="text-base md:text-lg font-black text-white">
                      {item.nome}
                    </h2>

                    <p className="text-xs md:text-sm text-slate-300">
                      {item.colorwayNome} • Tam. {item.tamanho}
                    </p>

                    <p className="text-yellow-400 font-black mt-1">
                      {formatMoney(item.preco)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      className="w-8 h-8 rounded-lg bg-white text-slate-950 font-black"
                    >
                      -
                    </button>

                    <span className="w-6 text-center text-white font-bold">
                      {item.quantidade}
                    </span>

                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      className="w-8 h-8 rounded-lg bg-white text-slate-950 font-black"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-xs text-red-300 hover:text-red-400 font-semibold"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <aside className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-6 shadow-2xl">
              <h2 className="text-2xl font-black text-white">Resumo</h2>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-slate-200">
                  <span>Pares</span>
                  <span>{resumo.quantidadePares}</span>
                </div>

                <div className="flex justify-between text-slate-200">
                  <span>Subtotal</span>
                  <span>{formatMoney(resumo.subtotal)}</span>
                </div>

                <div className="flex justify-between text-green-400 font-bold">
                  <span>Desconto {Math.round(resumo.descontoPercentual * 100)}%</span>
                  <span>- {formatMoney(resumo.descontoValor)}</span>
                </div>

                <div className="border-t border-slate-700 pt-4 flex justify-between text-white text-xl font-black">
                  <span>Total</span>
                  <span>{formatMoney(resumo.totalProdutos)}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Frete calculado no checkout após informar o CEP.
              </p>

              <Link
                href="/checkout"
                onClick={() => {
                  trackMetaCustomEvent("GoToCheckout", {
                    value: resumo.totalProdutos,
                    currency: "BRL",
                  });
                }}
                className="block text-center mt-6 rounded-2xl bg-yellow-400 text-slate-950 px-8 py-4 font-black"
              >
                Ir para checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}