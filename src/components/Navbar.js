import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-20  p-6 flex flex-row items-center bg-slate-100 border-slate-400 shadow-md z-10">
      <span className="w-full font-bold text-3xl h-auto flex justify-start items-start text-center ">
        LOGO
      </span>
      <div className=" w-full flex flex-row items-center justify-end">
        <Link
          href="/"
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Inicio
        </Link>
        <Link
          href="/"
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Comprar
        </Link>
        <Link
          href="/"
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Vender
        </Link>
        <Link
          href="/"
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Alugar
        </Link>
        <Link
          href="/auth/signin"
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-200 bg-[--primary] rounded-lg py-3 px-4 mx-1 font-medium"
        >
          Entrar
        </Link>
        <Link
          href="/auth/signup"
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Cadastrar-se
        </Link>
      </div>
    </nav>
  );
}
