"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Produto } from "@/src/data/produtos";
import { TAMANHOS_EXIBIDOS } from "@/src/data/produtos";
import { CART_KEY, CartItem, formatMoney } from "@/src/lib/cart";
import { trackMetaEvent, trackMetaCustomEvent } from "@/src/lib/metaPixel";

export default function ProdutoClient({ produto }: { produto: Produto }) {
  const router = useRouter();

  const [colorwayIndex, setColorwayIndex] = useState(0);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<number | null>(null);
  const [mensagemTamanho, setMensagemTamanho] = useState("");
  const [disponivelSelecionado, setDisponivelSelecionado] = useState<boolean | null>(null);
  const [mensagemCarrinho, setMensagemCarrinho] = useState("");

  const colorwayAtual = useMemo(() => {
    return produto.colorways[colorwayIndex] ?? produto.colorways[0];
  }, [produto.colorways, colorwayIndex]);

  const imagensAtuais = useMemo(() => {
    return colorwayAtual?.imagens ?? [];
  }, [colorwayAtual]);

  useEffect(() => {
    if (!produto || !colorwayAtual) return;

    trackMetaEvent("ViewContent", {
      content_name: produto.nome,
      content_ids: [produto.slug],
      content_type: "product",
      value: colorwayAtual.preco,
      currency: "BRL",
    });
  }, [produto, colorwayAtual]);

  if (!produto || !produto.colorways || produto.colorways.length === 0) {
    return <p className="text-white text-center">Produto indisponível.</p>;
  }

  const trocarColorway = (index: number) => {
    setColorwayIndex(index);
    setImagemIndex(0);
    setTamanhoSelecionado(null);
    setMensagemTamanho("");
    setDisponivelSelecionado(null);
    setMensagemCarrinho("");

    trackMetaCustomEvent("ColorwaySelected", {
      product: produto.nome,
      colorway: produto.colorways[index]?.nome,
    });
  };

  const imagemAnterior = () => {
    if (imagensAtuais.length === 0) return;
    setImagemIndex((atual) =>
      atual === 0 ? imagensAtuais.length - 1 : atual - 1
    );
  };

  const proximaImagem = () => {
    if (imagensAtuais.length === 0) return;
    setImagemIndex((atual) =>
      atual === imagensAtuais.length - 1 ? 0 : atual + 1
    );
  };

  const selecionarTamanho = (valor: string) => {
    if (!valor) {
      setTamanhoSelecionado(null);
      setMensagemTamanho("");
      setDisponivelSelecionado(null);
      return;
    }

    const tamanho = Number(valor);
    const disponivel = colorwayAtual.tamanhosDisponiveis.includes(tamanho);

    setTamanhoSelecionado(tamanho);
    setDisponivelSelecionado(disponivel);
    setMensagemTamanho(
      disponivel
        ? `Disponível no tamanho ${tamanho}`
        : `Indisponível no tamanho ${tamanho}`
    );

    trackMetaCustomEvent("SizeSelected", {
      product: produto.nome,
      colorway: colorwayAtual.nome,
      size: tamanho,
      available: disponivel,
    });
  };

  const adicionarAoCarrinho = () => {
    if (!tamanhoSelecionado) {
      setMensagemCarrinho("Selecione seu tamanho antes de adicionar ao carrinho.");
      return;
    }

    if (!colorwayAtual.tamanhosDisponiveis.includes(tamanhoSelecionado)) {
      setMensagemCarrinho("Esse tamanho não está disponível nesta colorway.");
      return;
    }

    const itemId = `${produto.slug}-${colorwayAtual.id}-${tamanhoSelecionado}`;

    const novoItem: CartItem = {
      id: itemId,
      slug: produto.slug,
      nome: produto.nome,
      colorwayId: colorwayAtual.id,
      colorwayNome: colorwayAtual.nome,
      tamanho: tamanhoSelecionado,
      preco: colorwayAtual.preco,
      imagem: imagensAtuais[0] || "",
      quantidade: 1,
    };

    const carrinhoAtual: CartItem[] = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    const itemExistente = carrinhoAtual.find((item) => item.id === itemId);

    const carrinhoAtualizado = itemExistente
      ? carrinhoAtual.map((item) =>
          item.id === itemId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      : [...carrinhoAtual, novoItem];

    localStorage.setItem(CART_KEY, JSON.stringify(carrinhoAtualizado));

    trackMetaEvent("AddToCart", {
      content_name: produto.nome,
      content_ids: [produto.slug],
      content_type: "product",
      value: colorwayAtual.preco,
      currency: "BRL",
    });

    router.push("/carrinho");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* Galeria de imagens — 500×500 via CSS puro, sem window */}
      <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4 md:p-5 shadow-2xl">
        <div className="rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center w-full h-[330px] md:h-[500px]">
          {imagensAtuais.length > 0 && (
            <img
              src={imagensAtuais[imagemIndex]}
              alt={`${produto.nome} - ${colorwayAtual.nome}`}
              className="w-auto h-auto max-w-full max-h-full md:max-w-[500px] md:max-h-[500px] object-contain block"
            />
          )}
        </div>

        {/* Setas fora da imagem — não tampam o produto no mobile */}
        {imagensAtuais.length > 1 && (
          <div className="flex items-center justify-between mt-3 px-1">
            <button
              type="button"
              onClick={imagemAnterior}
              aria-label="Imagem anterior"
              className="w-10 h-10 rounded-full bg-white text-slate-900 text-2xl font-black shadow-lg flex items-center justify-center hover:bg-yellow-400 transition"
            >
              ‹
            </button>

            <span className="text-xs text-slate-400 font-mono">
              {imagemIndex + 1} / {imagensAtuais.length}
            </span>

            <button
              type="button"
              onClick={proximaImagem}
              aria-label="Próxima imagem"
              className="w-10 h-10 rounded-full bg-white text-slate-900 text-2xl font-black shadow-lg flex items-center justify-center hover:bg-yellow-400 transition"
            >
              ›
            </button>
          </div>
        )}

        {/* Miniaturas */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">
          {imagensAtuais.map((imagem, index) => (
            <button
              key={`${colorwayAtual.id}-${imagem}`}
              type="button"
              onClick={() => setImagemIndex(index)}
              aria-label={`Ver imagem ${index + 1}`}
              className={`flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition ${
                imagemIndex === index
                  ? "border-2 border-yellow-400 shadow-[0_0_0_2px_rgba(250,204,21,0.25)]"
                  : "border border-slate-300"
              } bg-white`}
            >
              <img
                src={imagem}
                alt={`${produto.nome} miniatura ${index + 1}`}
                className="w-[72px] h-[72px] object-contain bg-slate-50 block"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Painel de compra */}
      <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-6 shadow-2xl text-center flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.25em] text-yellow-400">
          Tênis de Basquete
        </p>

        <h1 className="text-3xl md:text-4xl font-black mt-3 text-white">
          {produto.nome}
        </h1>

        <p className="text-slate-200 mt-4 leading-7 max-w-xl">
          {produto.descricao}
        </p>

        {/* Preço com desconto de 60% para 1 par */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-slate-400 text-sm line-through">
            De {formatMoney(colorwayAtual.preco)}
          </span>
          <span className="text-3xl font-black text-white">
            Por {formatMoney(colorwayAtual.preco * 0.4)}
          </span>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-black text-white">
            60% OFF na compra de 1 par
          </span>
          <span className="text-xs text-yellow-400 font-semibold mt-1">
            Comprando 2 ou mais: 70% OFF — {formatMoney(colorwayAtual.preco * 0.3)} cada
          </span>
        </div>

        {/* Colorways */}
        <div className="mt-8 w-full flex flex-col items-center">
          <p className="text-sm font-semibold mb-3 text-white">
            Escolha a colorway
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {produto.colorways.map((colorway, index) => (
              <button
                key={colorway.id}
                type="button"
                onClick={() => trocarColorway(index)}
                className={`px-4 py-2 rounded-2xl border text-sm font-black transition ${
                  colorwayIndex === index
                    ? "bg-yellow-400 text-slate-950 border-yellow-400 shadow-lg"
                    : "bg-slate-950 text-white border-yellow-400 hover:bg-yellow-400 hover:text-slate-950"
                }`}
              >
                {colorway.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Tamanho */}
        <div className="mt-8 w-full flex flex-col items-center">
          <p className="text-sm font-semibold mb-3 text-white">
            Veja se tem seu número
          </p>

          <select
            value={tamanhoSelecionado ?? ""}
            onChange={(e) => selecionarTamanho(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              color: "#020617",
              WebkitTextFillColor: "#020617",
            }}
            className="w-full max-w-xs rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-yellow-400"
          >
            <option value="">Selecione o tamanho</option>
            {TAMANHOS_EXIBIDOS.map((tamanho) => (
              <option key={tamanho} value={tamanho}>
                {tamanho}
              </option>
            ))}
          </select>

          {mensagemTamanho && (
            <div className="mt-4">
              <span
                className={`inline-flex rounded-full text-white px-4 py-2 text-sm font-semibold shadow ${
                  disponivelSelecionado ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {mensagemTamanho}
              </span>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={adicionarAoCarrinho}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 text-slate-950 px-8 py-4 font-black shadow-lg transition hover:scale-[1.01] hover:bg-yellow-300"
          >
            Adicionar ao carrinho
          </button>

          <Link
            href="/carrinho"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-yellow-400 text-yellow-400 bg-transparent px-8 py-4 font-black shadow-lg transition hover:bg-yellow-400 hover:text-slate-950"
          >
            Ver carrinho
          </Link>
        </div>

        {mensagemCarrinho && (
          <p className="text-sm text-slate-100 mt-4">{mensagemCarrinho}</p>
        )}
      </div>
    </div>
  );
}
