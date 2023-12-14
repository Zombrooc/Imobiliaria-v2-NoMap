import { collection, query, where, getDocs, onSnapshot, QuerySnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from '@/lib/firebase';

import PropertyItem from "@/components/PropertyItem";

async function getData() {
  const propertiesRef = collection(db, "properties");

  const q = query(propertiesRef);
  const querySnapshot = await getDocs(q);

  const preData = []

  querySnapshot.forEach((doc) => {
    const propertyData = doc.data()

    preData.push({ id: doc.id, ...propertyData })

  });

  return preData
}


export default async function PropertyList() {


  const [properties, setProperties] = useState([])

  getData().then(async (data) => {
    await setProperties([...data])
  })

  return (

    <div className=" rounded-xl shadow-md p-8 bg-slate-100">
      <h1 className="text-2xl font-bold">
        {" "}
        Conheça alguns dos nossos imóveis{" "}
      </h1>
      <hr className="my-5" />
      <div className="w-full flex flex-wrap cont">
        {properties.length > 0 && properties.map(property => {
          console.log(property)
          return (<PropertyItem key={property.id + + Math.random()} property={property} />)
        }) || <h2> Nenhuma propriedade a ser exibida no momento.</h2>}
      </div>
    </div>
  );
}