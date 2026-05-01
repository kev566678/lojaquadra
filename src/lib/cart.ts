export const CART_KEY = "quadraking_cart";
export const FRETE_SEDEX = 51;

export type CartItem = {
  id: string;
  slug: string;
  nome: string;
  colorwayId: string;
  colorwayNome: string;
  tamanho: number;
  preco: number;
  imagem: string;
  quantidade: number;
};

export function formatMoney(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calcularResumoCarrinho(items: CartItem[]) {
  const quantidadePares = items.reduce((total, item) => total + item.quantidade, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const descontoPercentual =
    quantidadePares >= 2 ? 0.7 : quantidadePares === 1 ? 0.6 : 0;

  const descontoValor = subtotal * descontoPercentual;
  const totalProdutos = subtotal - descontoValor;

  return {
    quantidadePares,
    subtotal,
    descontoPercentual,
    descontoValor,
    totalProdutos,
  };
}

export function calcularDataEntrega(diasUteis = 5) {
  const data = new Date();
  let diasAdicionados = 0;

  while (diasAdicionados < diasUteis) {
    data.setDate(data.getDate() + 1);

    const diaSemana = data.getDay();

    if (diaSemana !== 0 && diaSemana !== 6) {
      diasAdicionados++;
    }
  }

  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });
}