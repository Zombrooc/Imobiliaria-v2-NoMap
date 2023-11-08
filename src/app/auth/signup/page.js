"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { auth, storage } from "@/lib/firebase";

export default function Signin() {
  const router = useRouter();

  const [uploadProgress, setUploadProgress] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/')
      }
    });
  }, [router]);

  const onSubmit = async ({ username, email, password, profileImage }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = auth.currentUser;

        sendEmailVerification(user).then(() => {
          console.log("Email de verificação enviado!");
        });
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            router.push("/?signup=success");
          })
          .catch((error) => {
            alert(error);
          });

        if (profileImage) {
          const file = profileImage[0];

          const extension = file.type.split("/")[1];

          // Makes reference to the storage bucket location
          const uploadRef = ref(
            storage,
            `uploads/${user.uid}/${Date.now()}.${extension}`
          );

          // Starts the upload
          const uploadTask = uploadBytesResumable(uploadRef, file);

          // Listen to updates to upload task
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const pct = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
              ).toFixed(0);
              setUploadProgress(pct);
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  alert("Não autorizado!");
                  break;
                case "storage/canceled":
                  alert("Upload cancelado!");
                  break;

                case "storage/unknown":
                  alert("Erro desconhecido!");
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                updateProfile(user, {
                  photoURL: url,
                })
                  .then(() => {
                    console.log("Image upload success");
                  })
                  .catch((error) => {
                    alert(error);
                  });
              });
            }
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(error);
      });
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Criar uma conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Foto de Perfil
              </label>

              <input
                type="file"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full  placeholder-gray-400/70  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                {...register("profileImage")}
              />
              <p className="mt-1 text-xs text-gray-500 " id="file_input_help">
                PNG, JPG or GIF (MAX. 800x800px).
              </p>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Seu nome
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  {...register("username", { required: "Digite seu nome" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[--primary] sm:text-sm sm:leading-6"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                E-mail
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Passe um e-mail válido" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[--primary] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("password", { minLength: 8 })}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[--primary] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirmar senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("confirm-password", {
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Sua senha não é igual";
                      }
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[--primary] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--primary]"
              >
                Criar conta
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já tem cadastro?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold leading-6 text-[--primary] hover:text-[--primary]"
            >
              Entrar agora
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
