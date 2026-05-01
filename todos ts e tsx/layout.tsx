import "./globals.css";
import type { Metadata } from "next";
import MetaPixel from "@/src/components/MetaPixel";
import FloatingWhatsapp from "@/src/components/FloatingWhatsapp";

export const metadata: Metadata = {
  title: "QUADRAKING STORE",
  description: "Loja de tênis de basquete com pagamento via PIX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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