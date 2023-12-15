import PropertyItem from "@/components/PropertyItem";

const URL = process.env.NEXT_PUBLIC_SITEURL;

async function getData() {
  const res = await fetch(`${URL}/properties/api/getProperties`, {
    method: 'GET',
    next: {
      revalidate: 600
    }
  })

  const { properties } = await res.json()

  return properties
}

export default async function PropertyList() {

  const properties = await getData();

  return (

    <div className=" rounded-xl shadow-md p-8 bg-slate-100">
      <h1 className="text-2xl font-bold">
        {" "}
        Conheça alguns dos nossos imóveis{" "}
      </h1>
      <hr className="my-5" />
      <div className="w-full flex flex-wrap cont">
        {properties.length >= 0 && properties.map(property => {
          return (<PropertyItem key={property.id + + Math.random()} property={property} />)
        }) || <h2> Nenhuma propriedade a ser exibida no momento.</h2>}
      </div>
    </div>
  );
}