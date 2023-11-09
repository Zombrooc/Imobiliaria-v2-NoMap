import Image from "next/image";

export default function PropertyItem({ img }) {
  return (
    <>
      <div className="w-52 rounded-xl shadow-md m-5 overflow-hidden">
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
          <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </span>
        </div>
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
