export default function PropertyItem({ img }) {
  return (
    <div className="w-64 rounded-xl shadow-md overflow-hidden m-5">
      <img src={img} className="w-72 mx-auto" />
      <div className="p-4 font-medium text-gray-400">
        <div className=" flex content-justify pt-1">
          <div className="w-full">
            <span> Quartos: 2 </span>
          </div>
          <div className="w-full flex justify-end">
            <span> Suítes: 2 </span>
          </div>
        </div>
        <div className=" flex content-justify pt-1">
          <div className="w-full">
            <span> Garagem: Sim </span>
          </div>
          <div className="w-full flex justify-end">
            <span> Para 2 carros </span>
          </div>
        </div>
        <div className="pt-1">
          <span> Área: 65m² </span>
        </div>
      </div>
      <a
        type="button"
        className="w-full h-full p-3 text-center text-lg font-medium bg-[--primary] text-neutral-200 cursor-pointer"
      >
        {" "}
        Saiba mais
      </a>
    </div>
  );
}
