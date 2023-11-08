import Image from "next/image";

export default function PropertyItem({ img }) {
  return (
    <>
      <div className="w-52 rounded-xl shadow-md m-5 overflow-hidden">
        <Image
          src={img}
          alt="Picture of the author"
          className="w-72 mx-auto"
          width={224}
          height={140}
        />
        <div className="p-3 text-xs font-medium text-gray-400">
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
          className="w-full p-3 text-center text-lg font-medium bg-[--primary] text-neutral-200 cursor-pointer"
        >
          {" "}
          Saiba mais
        </a>
      </div>
    </>
  );
}
