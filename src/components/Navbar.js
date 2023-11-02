export default function Navbar() {
  return (
    <nav className="w-full h-20  p-6 flex flex-row items-center bg-slate-100 border-slate-400 shadow-md z-10">
      <span className="w-full font-bold text-3xl h-auto flex justify-start items-start text-center ">
        LOGO
      </span>
      <div className=" w-full flex flex-row items-center justify-end">
        <a
          src=""
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Inicio
        </a>
        <a
          src=""
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Comprar
        </a>
        <a
          src=""
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Vender
        </a>
        <a
          src=""
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Alugar
        </a>
        <a
          src=""
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-200 bg-[--primary] rounded-lg py-3 px-4 mx-1 font-medium"
        >
          Entrar
        </a>
        <a
          src=""
          className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
        >
          Cadastrar-se
        </a>
      </div>
    </nav>
  );
}
