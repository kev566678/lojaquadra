import "./globals.css";
import type { Metadata, Viewport } from "next";
import MetaPixel from "@/src/components/MetaPixel";
import FloatingWhatsapp from "@/src/components/FloatingWhatsapp";

export const metadata: Metadata = {
  metadataBase: new URL("https://lojaqp.com.br"),
  title: "lojaqp.com.br — Tênis de Basquete | Promoção",
  description: "Últimos dias: 1 par por R$299 ou 2 pares por R$499, frete grátis para todo o Brasil. Atendimento pelo WhatsApp.",
  openGraph: {
    title: "lojaqp.com.br — Últimos dias da promoção",
    description: "1 par por R$299 ou 2 pares por R$499 • frete grátis • até 12x sem juros no cartão.",
    url: "https://lojaqp.com.br",
    siteName: "lojaqp.com.br",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#020814",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <MetaPixel />
        {children}
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
