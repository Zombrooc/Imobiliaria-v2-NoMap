"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";

import { storage, db } from "../lib/firebase";

import { onAuthStateChanged } from "firebase/auth";

import Navbar from "@/components/Navbar";
import PropertyList from "@/components/PropertyList";
import Modal from '@/components/Modal';

import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loading_Spinner";

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(null)
  const [createPropertyModal, setCreatePropertyModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      }
    });
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({
    price,
    propertyArea,
    rooms,
    propertyDestination,
    isFavorite,
    propertyImages,
    hasGarage,
    numberOfCars
  }) => {

    setIsLoading(true);
    setIsLoadingMessage('Criando propriedade...')

    const docRef = await addDoc(collection(db, "properties"), {
      price,
      propertyArea,
      rooms,
      propertyDestination,
      isFavorite,
      hasGarage,
      numberOfCars,
    });

    let uploadCounter = 0;

    await Promise.all([...propertyImages].map(async (propertyImage) => {
      setIsLoadingMessage(`Enviando ${uploadCounter} de ${[...propertyImages].length} imagens.`);
      const storageRef = ref(storage, 'uploads/' + propertyImage.name);
      uploadBytes(storageRef, propertyImage)
        .then((snapshot) => {
          uploadCounter++;
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (downloadURL) => {

            await updateDoc(doc(db, "properties", docRef.id), {
              imageUrls: arrayUnion(downloadURL),
            });
          });

          if (uploadCounter === [...propertyImages].length) {
            setCreatePropertyModal(false)
            setIsLoading(false)
            setIsLoadingMessage(null)
            reset()
            uploadCounter = 0;

            router.push(`/properties/${storageRef.id}`)


          }
        }).catch(err => {
          console.log(err)
        });
    }))
  }

  return (
    <>
      <Navbar />
      <main className="w-screen p-6">
        <Suspense fallback={<LoadingSpinner />}>
          <PropertyList />
        </Suspense>
      </main>
      <Modal isLoading={isLoading} isLoadingMessage={isLoadingMessage} isOpen={createPropertyModal} modalTitle="Criar novo imóvel" setCreatePropertyModal={setCreatePropertyModal}>
        <div className="mt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="propertyImages"
                  className="block mb-2 text-sm font-medium text-gray-900  "
                >
                  Fotos do imóvel
                </label>

                <input
                  type="file"
                  name="propertyImages"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2"
                  {...register("propertyImages")}
                  multiple
                  accept="image/png, image/jpeg, image/gif"
                />
                <span
                  className="mt-1 text-xs text-gray-500 "
                  id="file_input_help"
                >
                  PNG, JPG or GIF (MAX. 800x800px).
                </span>
              </div>
              <div>
                <label
                  htmlFor="rooms"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Número de Quartos
                </label>
                <input
                  name="rooms"
                  type="number"
                  {...register("rooms", {
                    required:
                      "Digite a quantidade de quartos do imóvel",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2"
                  placeholder="2"
                />
                <label
                  htmlFor="suites"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Suites
                </label>
                <input
                  name="suites"
                  type="number"
                  {...register("suites", {
                    required:
                      "Digite a quantidade de suites do imóvel",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2"
                  placeholder="2"
                />
              </div>
              <div>
                <label
                  htmlFor="propertyArea"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  {" "}
                  Área
                </label>
                <input
                  type="number"
                  name="propertyArea"
                  {...register("propertyArea", {
                    required:
                      "Digite o tamanho da proprieda (m²)",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2.5 "
                  placeholder="200m²"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  {" "}
                  Descrição
                </label>
                <textarea
                  name="description"
                  {...register("description", {
                    required:
                      "Digite uma descrição para a propriedade....",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2.5 "
                  placeholder="Digite uma descrição para a propriedade"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Valor do Imóvel
                </label>
                <input
                  type="number"
                  name="price"
                  {...register("price", {
                    required: "Digite o valor do imóvel",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2.5 "
                  placeholder="R$ 500"
                />
              </div>
              <div>
                <label
                  htmlFor="propertyDestination"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Destino do imóvel
                </label>
                <select
                  name="propertyDestination"
                  {...register("propertyDestination", {
                    required:
                      "Necessário escolher um destino para esse imóvel.",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                >
                  <option defaultValue value="rent">
                    Locação
                  </option>
                  <option value="sell">Venda</option>
                  <option value="auction">Leilão</option>
                </select>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    name="isFavorite"
                    type="checkbox"
                    {...register("isFavorite")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="isFavorite"
                    className="ml-2 text-sm font-medium text-gray-900 "
                  >
                    Favoritar
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    name="hasGarage"
                    type="checkbox"
                    {...register("hasGarage")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="hasGarage"
                    className="ml-2 text-sm font-medium text-gray-900 "
                  >
                    Possui Garagem?
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="numberOfCars"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Garagem para:
                  </label>
                  <input
                    type="number"
                    name="numberOfCars"
                    {...register("numberOfCars")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--primary] focus:border-[--primary] block w-full p-2.5 "
                    placeholder="5 carros"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-[--primary] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Adicionar Imóvel
            </button>
          </form>
        </div>
      </Modal>
      {user && (<div
        className="w-12 h-12 absolute right-3 bottom-3 shadow-md rounded-full bg-[--primary] flex justify-center items-center text-[--white]  p-2 cursor-pointer"
        onClick={() => setCreatePropertyModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          fill="#fff"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </div>)}
    </>
  );
}
