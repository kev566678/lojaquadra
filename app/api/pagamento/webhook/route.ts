import { NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function notificarTelegram(mensagem: string) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: mensagem,
      parse_mode: "HTML",
    }),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const evento = body?.event ?? body?.type ?? "";
    const transacao = body?.data ?? body?.transaction ?? body ?? {};

    // Só notifica se o pagamento foi aprovado
    if (evento !== "payment.approved") {
      return NextResponse.json({ ok: true, ignorado: true });
    }

    const id = transacao?.id ?? "—";
    const valor = transacao?.amount
      ? (transacao.amount / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "—";
    const status = transacao?.status ?? "approved";
    const criadoEm = transacao?.createdAt
      ? new Date(transacao.createdAt).toLocaleString("pt-BR")
      : new Date().toLocaleString("pt-BR");

    const mensagem = `
✅ <b>PAGAMENTO CONFIRMADO — QUADRAKING STORE</b>

💰 Valor: <b>${valor}</b>
🆔 ID da transação: <code>${id}</code>
📋 Status: ${status}
🕐 Data: ${criadoEm}

🚀 Prepare o pedido para envio!
    `.trim();

    await notificarTelegram(mensagem);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no webhook Promisse:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}