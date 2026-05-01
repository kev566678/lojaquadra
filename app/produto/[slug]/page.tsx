import Link from "next/link";
import { notFound } from "next/navigation";
import { produtos } from "@/src/data/produtos";
import ProdutoClient from "./ProdutoClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;

  const produto = produtos.find((item) => item.slug === slug);

  if (!produto) {
    notFound();
  }

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

          <span className="text-sm text-slate-200">Produto</span>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <ProdutoClient produto={produto} />
      </section>
    </main>
  );
}