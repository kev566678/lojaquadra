import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("NOVO PEDIDO QUADRAKING:", {
      cliente: body.cliente,
      endereco: body.endereco,
      items: body.items,
      formaPagamento: body.formaPagamento,
      subtotal: body.subtotal,
      descontoPercentual: body.descontoPercentual,
      descontoValor: body.descontoValor,
      frete: body.frete,
      prazoEntrega: body.prazoEntrega,
      totalFinal: body.totalFinal,
    });

    const valorEmCentavos = Math.round((body.valor || 0) * 100);

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