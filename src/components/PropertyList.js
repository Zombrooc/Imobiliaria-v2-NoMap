import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from '@/lib/firebase';

import PropertyItem from "@/components/PropertyItem";

export default function PropertyList() {

  const [properties, setProperties] = useState([])

  useEffect(() => {

    const fetchData = async () => {

      const propertiesRef = collection(db, "properties");

      const q = query(propertiesRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        const propertyData = doc.data()

        console.log(doc)

        await setProperties([...properties, { id: doc.id, propertyData }])
      });
    }

    fetchData()

  }, [])

  return (

    <div className=" rounded-xl shadow-md p-8 bg-slate-100">
      <h1 className="text-2xl font-bold">
        {" "}
        Conheça alguns dos nossos imóveis{" "}
      </h1>
      <hr className="my-5" />
      <div className="w-full flex flex-wrap cont">
        {properties.map(property => {
          return (<PropertyItem key={property.id + + Math.random()} property={property} />)
        })}
      </div>
    </div>
  );
}