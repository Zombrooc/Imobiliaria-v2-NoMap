import PropertyItem from "@/components/PropertyItem";

const URL = process.env.NEXT_PUBLIC_SITEURL;

async function getProperties() {

  const res = await fetch(`${URL}/properties/api/getProperties`, { method: 'GET', next: { revalidate: 300 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function PropertyList() {

  const { properties } = await getProperties()


  return (

    <div className=" rounded-xl shadow-md p-8 bg-slate-100">
      <h1 className="text-2xl font-bold">
        {" "}
        Conheça alguns dos nossos imóveis{" "}
      </h1>
      <hr className="my-5" />
      <div className="w-full flex flex-wrap cont">
        {properties.length > 0 && properties.map(property => {
          return (<PropertyItem key={property.id + + Math.random()} property={property} />)
        }) || <h2> Nenhuma propriedade a ser exibida no momento.</h2>}
      </div>
    </div>
  );
}