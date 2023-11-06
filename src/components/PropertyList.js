import PropertyItem from "@/components/PropertyItem";

export default function PropertyList() {
  return (
    // <div className="rounded-xl shadow-md p-14 bg-slate-100">
    <div className="mx-auto rounded-xl shadow-md p-14 bg-slate-100">
      <h1 className="text-4xl font-bold">
        {" "}
        Conheça alguns dos nossos imóveis{" "}
      </h1>
      <hr className="my-5" />
      <div className="w-full flex flex-wrap cont">
        <PropertyItem img="https://i.pinimg.com/originals/7b/54/2b/7b542ba4f11e79465a9b3a85e8781fa2.jpg" />
        <PropertyItem img="https://mondonex.com.br/wp-content/uploads/2021/11/CASA-PORTO-RICO-RESIDENCE-RESORT-PR-PP-Q02-L15-FACHADA-2.jpg" />
      </div>
    </div>
  );
}
