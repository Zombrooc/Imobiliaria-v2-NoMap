"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "@/components/Navbar";
import PropertyList from "@/components/PropertyList";
import { auth, storage, db } from "../lib/firebase";
import LoadingSpinner from "@/components/Loading_Spinner";

export default function Home() {
  const [user, setUser] = useState(null);
  const [createPropertyModal, setCreatePropertyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(null)
  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      }
    });
  }, [user]);

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
      setIsLoadingMessage(`Enviando ${uploadCounter} de ${[...propertyImages].length} imagens.`)
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
          }
        }).catch(err => {
          console.log(err)
        });
    }))
  }
  return (
    <>
      <Navbar />
      {/* {succededSignup && (
        <Banner>
          {" "}
          <strong> Parabéns!! </strong> Sua conta foi criada com sucesso! Acesse
          a caixa de entrada do seu e-mail para confirmar a criação da sua
          conta.
        </Banner>
      )} */}
      <main className="w-full p-6">
        <PropertyList />
      </main>
      <Transition.Root show={createPropertyModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setCreatePropertyModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white min-h-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                    {!isLoading && (
                      <div >
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900 flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
                          >
                            Criar novo imóvel
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                              data-modal-toggle="defaultModal"
                              onClick={() => setCreatePropertyModal(false)}
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                          </Dialog.Title>
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
                        </div>
                      </div>
                    )}

                    {isLoading && <LoadingSpinner loadingContent={isLoadingMessage} />}

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {user && (<div
        className="w-12 h-12 sticky right-3 bottom-3 shadow-md rounded-full bg-[--primary] flex justify-center items-center text-[--white]  p-2 cursor-pointer"
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
