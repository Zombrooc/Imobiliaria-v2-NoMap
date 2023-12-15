import Image from "next/image";
import Link from "next/link";

export default function PropertyItem({ property }) {

  return (
    <div className="relative">
      {property.isFavorite && (
        <span className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 font-semibold text-white bg-amber-400 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>

          <span className="sr-only">Estrela (Propriedade mais procurada)</span>
        </span>
      )}
      <div className="w-52 rounded-xl shadow-md m-5 overflow-hidden">
        {property.imageUrls.length > 0 && (
          <Image
            src={property.imageUrls[0]}
            alt="Imagem da propriedade"
            className="w-72 mx-auto"
            width={224}
            height={140}
          />
        )}
        <div className="p-3 text-xs font-medium text-gray-400">
          <div className=" flex content-justify pt-1">
            <div className="w-full">
              <span> Quartos: {property.rooms} </span>
            </div>
            <div className="w-full flex justify-end">
              <span> Suítes: {property.suites} </span>
            </div>
          </div>
          <div className=" flex content-justify pt-1">
            <div className="w-full">
              <span> Garagem: {property.garage} </span>
            </div>
            <div className="w-full flex justify-end">
              <span> Para {property.numberOfCars} carros </span>
            </div>
          </div>
          <div className="pt-1">
            <span> Área: {property.propertyArea} m² </span>
          </div>
        </div>
        <Link
          type="button"
          className="w-full p-3 text-center text-lg font-medium bg-[--primary] text-neutral-200 cursor-pointer"
          href={`/properties/${property.id}`}
        >
          {" "}
          Saiba mais
        </Link>
      </div>
    </div>
  );
}
