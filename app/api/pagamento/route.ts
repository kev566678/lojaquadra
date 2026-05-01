import { NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function notificarTelegram(mensagem: string) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram não configurado — pulando notificação.");
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensagem,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Erro ao enviar mensagem pro Telegram:", err);
  }
}

export async function POST(req: Request) {
  if (!process.env.PROMISSE_API_KEY) {
    console.error("PROMISSE_API_KEY não configurada no ambiente.");
    return NextResponse.json(
      { ok: false, mensagem: "Configuração de pagamento ausente no servidor." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const valor: number = body.valor ?? body.totalFinal ?? 0;

    if (!valor || valor <= 0) {
      return NextResponse.json(
        { ok: false, mensagem: "Valor do pedido inválido." },
        { status: 400 }
      );
    }

    const valorEmCentavos = Math.round(valor * 100);

    const itens = (body.items ?? [])
      .map(
        (item: {
          nome: string;
          colorwayNome: string;
          tamanho: number;
          quantidade: number;
          preco: number;
        }) =>
          `  • ${item.nome} | ${item.colorwayNome} | Tam. ${item.tamanho} | Qtd. ${item.quantidade} | R$ ${item.preco.toFixed(2)}`
      )
      .join("\n");

    const mensagemTelegram = `
🛒 <b>NOVO PEDIDO — QUADRAKING STORE</b>

👤 <b>Cliente</b>
Nome: ${body.cliente?.nomeCompleto ?? "—"}
Celular: ${body.cliente?.celular ?? "—"}
E-mail: ${body.cliente?.email ?? "—"}

📦 <b>Itens</b>
${itens || "—"}

📍 <b>Endereço</b>
${body.endereco?.rua ?? "—"}, ${body.endereco?.numero ?? "—"} ${body.endereco?.complemento ? `(${body.endereco.complemento})` : ""}
${body.endereco?.bairro ?? "—"} — ${body.endereco?.cidade ?? "—"}/${body.endereco?.estado ?? "—"}
CEP: ${body.endereco?.cep ?? "—"}

💰 <b>Resumo financeiro</b>
Subtotal: R$ ${body.subtotal?.toFixed(2) ?? "—"}
Desconto (${Math.round((body.descontoPercentual ?? 0) * 100)}%): - R$ ${body.descontoValor?.toFixed(2) ?? "—"}
Frete Sedex: R$ ${body.frete?.toFixed(2) ?? "—"}
<b>Total: R$ ${valor.toFixed(2)}</b>

🚚 Prazo estimado: ${body.prazoEntrega ?? "—"}
💳 Pagamento: ${body.formaPagamento ?? "—"}
    `.trim();

    await notificarTelegram(mensagemTelegram);

    const response = await fetch("https://api.promisse.com.br/transactions", {
      method: "POST",
      headers: {
        Authorization: `${process.env.PROMISSE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: valorEmCentavos,
      }),
    });

    const rawText = await response.text();

    let parsed: unknown = null;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = null;
    }

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      parsed,
      rawText,
    });
  } catch (error) {
    console.error("ERRO INTERNO:", error);

    return NextResponse.json(
      {
        ok: false,
        status: 500,
        mensagem: "Erro ao criar pagamento na Promisse",
      },
      { status: 500 }
    );
  }
}