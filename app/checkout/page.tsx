"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CART_KEY,
  CartItem,
  FRETE_SEDEX,
  calcularResumoCarrinho,
  calcularDataEntrega,
  formatMoney,
} from "@/src/lib/cart";
import { trackMetaEvent, trackMetaCustomEvent } from "@/src/lib/metaPixel";

type Endereco = {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
};

type Cliente = {
  nomeCompleto: string;
  celular: string;
  email: string;
};

type AvisoPagamento = null | "pix" | "cartao";

const inputStyle = {
  backgroundColor: "#ffffff",
  color: "#020617",
  WebkitTextFillColor: "#020617",
  caretColor: "#020617",
  border: "1px solid #cbd5e1",
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mensagemPix, setMensagemPix] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [pixCode, setPixCode] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [mensagemCep, setMensagemCep] = useState("");
  const [cepBuscado, setCepBuscado] = useState(false);
  const [avisoPagamento, setAvisoPagamento] = useState<AvisoPagamento>(null);
  const [confirmacaoPagamento, setConfirmacaoPagamento] = useState(false);
  const [modoCartao, setModoCartao] = useState(false);

  const [cliente, setCliente] = useState<Cliente>({
    nomeCompleto: "",
    celular: "",
    email: "",
  });

  const [endereco, setEndereco] = useState<Endereco>({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
  });

  useEffect(() => {
    const carrinho: CartItem[] = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    setItems(carrinho);

    trackMetaCustomEvent("CheckoutPageViewed", {
      items_count: carrinho.length,
    });
  }, []);

  const resumo = calcularResumoCarrinho(items);
  const prazoEntrega = calcularDataEntrega(5);
  const frete = cepBuscado ? FRETE_SEDEX : 0;
  const totalFinal = resumo.totalProdutos + frete;

  const atualizarEndereco = (campo: keyof Endereco, valor: string) => {
    setEndereco((atual) => ({ ...atual, [campo]: valor }));

    if (campo === "cep") {
      setCepBuscado(false);
      setMensagemCep("");
    }
  };

  const atualizarCliente = (campo: keyof Cliente, valor: string) => {
    setCliente((atual) => ({ ...atual, [campo]: valor }));
  };

  const buscarCep = async () => {
    const cepLimpo = endereco.cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setMensagemCep("Digite um CEP válido com 8 números.");
      setCepBuscado(false);
      return;
    }

    setBuscandoCep(true);
    setMensagemCep("");
    setCepBuscado(false);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setMensagemCep("CEP não encontrado.");
        setCepBuscado(false);
        return;
      }

      setEndereco((atual) => ({
        ...atual,
        cep: cepLimpo,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));

      setCepBuscado(true);
      setMensagemCep("Entrega disponível para este CEP.");

      trackMetaCustomEvent("CepSearched", {
        cep: cepLimpo,
        cidade: data.localidade || "",
        estado: data.uf || "",
      });
    } catch {
      setMensagemCep("Erro ao buscar CEP.");
      setCepBuscado(false);
    } finally {
      setBuscandoCep(false);
    }
  };

  const clienteCompleto =
    cliente.nomeCompleto.trim() &&
    cliente.celular.trim() &&
    cliente.email.trim();

  const enderecoCompleto =
    endereco.cep &&
    endereco.rua &&
    endereco.bairro &&
    endereco.cidade &&
    endereco.estado &&
    endereco.numero &&
    cepBuscado;

  // Valida tudo ANTES de abrir o aviso — erro aparece na tela, não dentro da modal
  const validarParaPagamento = (): string | null => {
    if (items.length === 0) return "Seu carrinho está vazio.";
    if (!clienteCompleto) return "Preencha nome completo, celular e e-mail.";
    if (!cepBuscado) return "Busque o CEP antes de gerar o pagamento.";
    if (!enderecoCompleto) return "Preencha o endereço completo antes de gerar o pagamento.";
    return null;
  };

  const abrirAvisoPix = () => {
    const erro = validarParaPagamento();
    if (erro) {
      setMensagemPix(erro);
      return;
    }

    setModoCartao(false);
    setConfirmacaoPagamento(false);
    setAvisoPagamento("pix");
    setMensagemPix("");
    setQrCode("");
    setPixCode("");

    trackMetaEvent("InitiateCheckout", {
      value: totalFinal,
      currency: "BRL",
      payment_method: "pix",
    });
  };

  const abrirAvisoCartao = () => {
    const erro = validarParaPagamento();
    if (erro) {
      setMensagemPix(erro);
      return;
    }

    setModoCartao(true);
    setConfirmacaoPagamento(false);
    setAvisoPagamento("cartao");
    setMensagemPix("");
    setQrCode("");
    setPixCode("");

    trackMetaEvent("InitiateCheckout", {
      value: totalFinal,
      currency: "BRL",
      payment_method: "picpay_card",
    });
  };

  const gerarPix = async (pagamentoViaCartao = false) => {
    setAvisoPagamento(null);
    setMensagemPix("Gerando pagamento...");

    try {
      const res = await fetch("/api/pagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valor: totalFinal,
          formaPagamento: pagamentoViaCartao ? "cartao-via-picpay" : "pix",
          cliente,
          items,
          endereco,
          frete,
          prazoEntrega,
          quantidadePares: resumo.quantidadePares,
          subtotal: resumo.subtotal,
          descontoPercentual: resumo.descontoPercentual,
          descontoValor: resumo.descontoValor,
          totalProdutos: resumo.totalProdutos,
          totalFinal,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setMensagemPix(data.mensagem || "Erro ao criar pagamento.");
        return;
      }

      const pagamento = data.parsed;

      if (!pagamento?.qrCodeBase64 || !pagamento?.copyPaste) {
        setMensagemPix("Pagamento criado, mas retorno incompleto.");
        return;
      }

      setQrCode(pagamento.qrCodeBase64);
      setPixCode(pagamento.copyPaste);
      setModoCartao(pagamentoViaCartao);
      setMensagemPix("Pagamento gerado com sucesso.");

      trackMetaEvent("AddPaymentInfo", {
        value: totalFinal,
        currency: "BRL",
        payment_method: pagamentoViaCartao ? "picpay_card" : "pix",
      });

      trackMetaCustomEvent("PaymentCodeGenerated", {
        value: totalFinal,
        currency: "BRL",
        payment_method: pagamentoViaCartao ? "picpay_card" : "pix",
        items_count: items.length,
      });
    } catch {
      setMensagemPix("Erro ao processar pagamento.");
    }
  };

  const confirmarAviso = () => {
    if (!confirmacaoPagamento || !avisoPagamento) return;
    gerarPix(avisoPagamento === "cartao");
  };

  const copiarPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setMensagemPix("Código copiado!");

      trackMetaCustomEvent("PaymentCodeCopied", {
        value: totalFinal,
        currency: "BRL",
        payment_method: modoCartao ? "picpay_card" : "pix",
      });
    } catch {
      setMensagemPix("Erro ao copiar código.");
    }
  };

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

          <Link
            href="/carrinho"
            className="text-sm text-slate-200 hover:text-yellow-400"
          >
            Voltar ao carrinho
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-6 md:p-8 shadow-2xl">
          <p className="text-yellow-400 text-sm uppercase tracking-[0.25em]">
            Checkout
          </p>

          <h1 className="text-3xl md:text-4xl font-black text-white mt-2">
            Finalizar pedido
          </h1>

          {items.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-center">
              <p className="text-white font-bold">Seu carrinho está vazio.</p>

              <Link
                href="/"
                className="inline-block mt-5 rounded-2xl bg-yellow-400 text-slate-950 px-8 py-4 font-black"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-slate-900 p-4 flex gap-4 items-center"
                  >
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        background: "#020617",
                        borderRadius: "12px",
                        padding: "4px",
                        flexShrink: 0,
                      }}
                    />

                    <div>
                      <h2 className="text-white font-black text-sm md:text-base">
                        {item.nome}
                      </h2>

                      <p className="text-slate-300 text-xs md:text-sm">
                        {item.colorwayNome} • Tam. {item.tamanho} • Qtd.{" "}
                        {item.quantidade}
                      </p>

                      <p className="text-yellow-400 font-bold text-sm">
                        {formatMoney(item.preco)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl bg-slate-900 p-5">
                  <h2 className="text-xl font-black text-white mb-4">
                    Dados do cliente
                  </h2>

                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      value={cliente.nomeCompleto}
                      onChange={(e) =>
                        atualizarCliente("nomeCompleto", e.target.value)
                      }
                      placeholder="Nome completo"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500 md:col-span-2"
                    />

                    <input
                      value={cliente.celular}
                      onChange={(e) =>
                        atualizarCliente("celular", e.target.value)
                      }
                      placeholder="Celular com DDD"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <input
                      value={cliente.email}
                      onChange={(e) =>
                        atualizarCliente("email", e.target.value)
                      }
                      placeholder="E-mail"
                      type="email"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <div className="mt-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-4">
                    <p className="text-slate-200 text-sm">
                      A nota fiscal e o código de rastreio serão enviados por{" "}
                      <span className="text-white font-bold">
                        e-mail e WhatsApp
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5">
                  <h2 className="text-xl font-black text-white mb-4">
                    Endereço de entrega
                  </h2>

                  <div className="grid md:grid-cols-[1fr_auto] gap-3">
                    <input
                      value={endereco.cep}
                      onChange={(e) =>
                        atualizarEndereco("cep", e.target.value)
                      }
                      placeholder="CEP"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <button
                      type="button"
                      onClick={buscarCep}
                      disabled={buscandoCep}
                      className="rounded-xl bg-yellow-400 text-slate-950 px-5 py-3 font-black disabled:opacity-60"
                    >
                      {buscandoCep ? "Buscando..." : "Buscar CEP"}
                    </button>
                  </div>

                  {mensagemCep && (
                    <p className="text-sm text-slate-200 mt-3">
                      {mensagemCep}
                    </p>
                  )}

                  <div className="grid md:grid-cols-2 gap-3 mt-4">
                    <input
                      value={endereco.rua}
                      onChange={(e) =>
                        atualizarEndereco("rua", e.target.value)
                      }
                      placeholder="Rua"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <input
                      value={endereco.numero}
                      onChange={(e) =>
                        atualizarEndereco("numero", e.target.value)
                      }
                      placeholder="Número"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <input
                      value={endereco.bairro}
                      onChange={(e) =>
                        atualizarEndereco("bairro", e.target.value)
                      }
                      placeholder="Bairro"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <input
                      value={endereco.complemento}
                      onChange={(e) =>
                        atualizarEndereco("complemento", e.target.value)
                      }
                      placeholder="Complemento"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <input
                      value={endereco.cidade}
                      onChange={(e) =>
                        atualizarEndereco("cidade", e.target.value)
                      }
                      placeholder="Cidade"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />

                    <input
                      value={endereco.estado}
                      onChange={(e) =>
                        atualizarEndereco("estado", e.target.value)
                      }
                      placeholder="UF"
                      style={inputStyle}
                      className="rounded-xl px-4 py-3 outline-none placeholder:text-slate-500"
                    />
                  </div>

                  {cepBuscado && (
                    <div className="mt-5 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-4">
                      <p className="text-yellow-400 font-black">
                        Entrega Sedex
                      </p>

                      <p className="text-slate-200 text-sm mt-1">
                        Frete para o endereço informado:{" "}
                        <span className="text-white font-bold">
                          {formatMoney(frete)}
                        </span>
                      </p>

                      <p className="text-slate-200 text-sm mt-1">
                        Prazo estimado de recebimento:{" "}
                        <span className="text-white font-bold">
                          {prazoEntrega}
                        </span>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 h-fit">
                <h2 className="text-2xl font-black text-white">Resumo</h2>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between text-slate-200">
                    <span>Subtotal</span>
                    <span>{formatMoney(resumo.subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-green-400 font-bold">
                    <span>
                      Desconto {Math.round(resumo.descontoPercentual * 100)}%
                    </span>
                    <span>- {formatMoney(resumo.descontoValor)}</span>
                  </div>

                  <div className="flex justify-between text-white font-bold">
                    <span>Total produtos</span>
                    <span>{formatMoney(resumo.totalProdutos)}</span>
                  </div>

                  {!cepBuscado && (
                    <div className="text-xs text-slate-400">
                      Informe o CEP para calcular o frete e prazo.
                    </div>
                  )}

                  {cepBuscado && (
                    <>
                      <div className="flex justify-between text-slate-200">
                        <span>Frete Sedex</span>
                        <span>{formatMoney(frete)}</span>
                      </div>

                      <div className="flex justify-between text-yellow-400 font-bold">
                        <span>Recebimento</span>
                        <span>{prazoEntrega}</span>
                      </div>
                    </>
                  )}

                  <div className="border-t border-slate-700 pt-4 flex justify-between text-white text-xl font-black">
                    <span>Total</span>
                    <span>{formatMoney(totalFinal)}</span>
                  </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={abrirAvisoPix}
                    className="w-full rounded-2xl bg-yellow-400 text-slate-950 px-6 py-4 font-black shadow-lg"
                  >
                    Gerar PIX
                  </button>

                  <button
                    type="button"
                    onClick={abrirAvisoCartao}
                    className="w-full rounded-2xl border-2 border-yellow-400 text-yellow-400 px-6 py-4 font-black hover:bg-yellow-400 hover:text-slate-950"
                  >
                    Pagar com cartão
                  </button>
                </div>

                {/* Mensagem de erro de validação — aparece aqui, visível, antes da modal */}
                {mensagemPix && !avisoPagamento && (
                  <p className="text-sm text-slate-100 mt-4 text-center">
                    {mensagemPix}
                  </p>
                )}

                {avisoPagamento && (
                  <div className="mt-5 rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-4">
                    <p className="text-yellow-400 font-black">
                      Atenção antes de continuar
                    </p>

                    {avisoPagamento === "pix" && (
                      <>
                        <p className="text-slate-200 text-sm mt-3 leading-6">
                          NuBank, Itaú e Inter estão com atraso no envio de
                          alguns Pix, peço que utilize qualquer outro banco!
                        </p>

                        <label className="flex gap-3 mt-4 text-white font-bold cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={confirmacaoPagamento}
                            onChange={(e) =>
                              setConfirmacaoPagamento(e.target.checked)
                            }
                          />
                          Qualquer outro banco, combinado?
                        </label>
                      </>
                    )}

                    {avisoPagamento === "cartao" && (
                      <>
                        <p className="text-slate-200 text-sm mt-3 leading-6">
                          Pagamento com cartão via app PicPay (Cartão de
                          qualquer banco), você tem que abrir seu app PicPay no
                          seu telefone.
                        </p>

                        <label className="flex gap-3 mt-4 text-white font-bold cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={confirmacaoPagamento}
                            onChange={(e) =>
                              setConfirmacaoPagamento(e.target.checked)
                            }
                          />
                          Pronto, já abri o app PicPay
                        </label>
                      </>
                    )}

                    <div className="flex gap-3 mt-5">
                      <button
                        type="button"
                        onClick={() => {
                          setAvisoPagamento(null);
                          setConfirmacaoPagamento(false);
                        }}
                        className="flex-1 rounded-2xl border border-slate-600 text-white px-4 py-3 font-bold"
                      >
                        Voltar
                      </button>

                      <button
                        type="button"
                        onClick={confirmarAviso}
                        disabled={!confirmacaoPagamento}
                        className="flex-1 rounded-2xl bg-yellow-400 text-slate-950 px-4 py-3 font-black disabled:opacity-50"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}

                {qrCode && (
                  <div className="mt-6 flex justify-center">
                    <div className="rounded-2xl border border-slate-700 bg-white p-4">
                      <img
                        src={qrCode}
                        alt="QR Code PIX"
                        className="w-52 max-w-full"
                      />
                    </div>
                  </div>
                )}

                {pixCode && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold mb-2 text-white">
                      Copia e cola:
                    </p>

                    <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl text-xs break-all text-slate-900 w-full text-left">
                      {pixCode}
                    </div>

                    <button
                      type="button"
                      onClick={copiarPix}
                      className="mt-3 w-full rounded-2xl bg-emerald-600 text-white px-6 py-3 font-semibold shadow"
                    >
                      Copiar código
                    </button>

                    {modoCartao && (
                      <div className="mt-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-4">
                        <p className="text-slate-200 text-sm leading-6">
                          Copie o código e vá em Pix copia e cola. Na hora de
                          pagar, aparecerá para cadastrar o cartão e pagar no
                          crédito. Escolha a quantidade de parcelas e confirme.
                          Pronto!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
