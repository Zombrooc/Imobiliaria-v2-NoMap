import { getDoc, doc } from "firebase/firestore";

import { db } from '@/lib/firebase';

export async function GET(req, { params }) {

  const docRef = doc(db, "properties", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()
    return Response.json(data)
  } else {
    return Response.json({ error: 'Propriedade não encontrada' }, { status: 404 })
  }
}