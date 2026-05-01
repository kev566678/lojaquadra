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
      <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4 md:p-5 shadow-2xl">
        <div
          className="mx-auto relative rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center"
          style={{
            width: "100%",
            maxWidth: "500px",
            height: window?.innerWidth && window.innerWidth < 768 ? "330px" : "500px",
          }}
        >
          {imagensAtuais.length > 0 && (
            <img
              src={imagensAtuais[imagemIndex]}
              alt={`${produto.nome} - ${colorwayAtual.nome}`}
              style={{
                maxWidth: "500px",
                maxHeight: "500px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          )}

          {imagensAtuais.length > 1 && (
            <>
              <button
                type="button"
                onClick={imagemAnterior}
                aria-label="Imagem anterior"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "9999px",
                  background: "#ffffff",
                  color: "#020617",
                  fontSize: "24px",
                  fontWeight: 900,
                  border: "none",
                  cursor: "pointer",
                  zIndex: 30,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                }}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={proximaImagem}
                aria-label="Próxima imagem"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "9999px",
                  background: "#ffffff",
                  color: "#020617",
                  fontSize: "24px",
                  fontWeight: 900,
                  border: "none",
                  cursor: "pointer",
                  zIndex: 30,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "16px",
            overflowX: "auto",
            paddingBottom: "8px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
          }}
        >
          {imagensAtuais.map((imagem, index) => (
            <button
              key={`${colorwayAtual.id}-${imagem}`}
              type="button"
              onClick={() => setImagemIndex(index)}
              aria-label={`Ver imagem ${index + 1}`}
              style={{
                flexShrink: 0,
                borderRadius: "16px",
                overflow: "hidden",
                border:
                  imagemIndex === index
                    ? "2px solid #facc15"
                    : "1px solid #cbd5e1",
                background: "#ffffff",
                cursor: "pointer",
                boxShadow:
                  imagemIndex === index
                    ? "0 0 0 2px rgba(250,204,21,0.25)"
                    : "none",
              }}
            >
              <img
                src={imagem}
                alt={`${produto.nome} miniatura ${index + 1}`}
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  background: "#f8fafc",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      </div>

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

        <p className="text-3xl font-black mt-6 text-white">
          {formatMoney(colorwayAtual.preco)}
        </p>

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