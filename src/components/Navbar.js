export function Navbar() {
  return (
    <nav className="w-screen h-20  p-6 flex flex-row items-center bg-slate-100 border-slate-400 shadow-md">
      <span className="w-full font-bold text-3xl h-auto flex justify-start items-start text-center ">
        LOGO
      </span>
      <div className=" w-full flex flex-row items-center justify-end">
        <div className="w-24 flex justify-center align-center text-base text-slate-500">
          Inicio
        </div>
        <div className="w-24 flex justify-center align-center text-base text-slate-500">
          COmprar
        </div>
        <div className="w-24 flex justify-center align-center text-base text-slate-500">
          Vender
        </div>
        <div className="w-24 flex justify-center align-center text-base text-slate-500">
          Alugar
        </div>
      </div>
    </nav>
  );
}
