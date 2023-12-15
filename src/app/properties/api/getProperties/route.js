import { collection, query, getDocs } from "firebase/firestore";

import { db } from '@/lib/firebase';

export async function GET(req) {
  const propertiesRef = collection(db, "properties");

  const q = query(propertiesRef);
  const querySnapshot = await getDocs(q);

  const properties = []

  querySnapshot.forEach((doc) => {
    const propertyData = doc.data()

    properties.push({ id: doc.id, ...propertyData })

  });

  return Response.json({ properties: [...properties] })

}