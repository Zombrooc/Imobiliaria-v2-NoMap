import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid h-full place-items-cente px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[--primary]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Desculpe, mas não pudemos encontrar a página que você estava
          procurando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-[--primary] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Voltar para o ínicio
          </Link>
        </div>
      </div>
    </main>
  );
}
