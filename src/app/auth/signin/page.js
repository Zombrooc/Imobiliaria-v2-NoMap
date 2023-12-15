"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function Signin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, [router]);

  const onSubmit = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            width={80}
            height={47}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                E-mail
              </label>
              <div className="mt-2">
                <input
                  {...register("email", { required: "Digite seu e-mail" })}
                  type="email"
                  autoComplete="email"
                  required
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
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-[--primary] hover:text-[--primary]"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", { required: "Digite sua senha" })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[--primary] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[--primary] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--primary]"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Ainda não tem cadastro?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold leading-6 text-[--primary] hover:text-[--primary]"
            >
              Cadastre-se por aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
