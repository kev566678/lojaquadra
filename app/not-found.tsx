import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-black">404</h1>
      <p className="text-slate-400 mt-2">Página não encontrada.</p>
      <Link href="/" className="mt-6 bg-yellow-400 text-slate-950 px-6 py-3 rounded-2xl font-black">
        Voltar para a loja
      </Link>
    </main>
  );
}