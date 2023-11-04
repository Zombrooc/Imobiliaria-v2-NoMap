"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";

import { auth } from "@/lib/firebase";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const userNavigation = [
  { name: "Seu Perfil", href: "#" },
  { name: "Configurações", href: "#" },
  { name: "Sair", href: "#"},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState([
    { name: "Ínicio", href: "#", current: true },
    { name: "Comprar", href: "#", current: false },
    { name: "Vender", href: "#", current: false },
    { name: "Alugar", href: "#", current: false },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <>
      {/* <nav className="w-full h-20  p-6 flex flex-row items-center bg-slate-100 border-slate-400 shadow-md z-10">
        <span className="w-full font-bold text-3xl h-auto flex justify-start items-start text-center ">
          LOGO
        </span>
        <div className=" w-full flex flex-row items-center justify-end">
          <Link
            href="/"
            className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/"
            className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
          >
            Comprar
          </Link>
          <Link
            href="/"
            className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
          >
            Vender
          </Link>
          <Link
            href="/"
            className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
          >
            Alugar
          </Link>
          {!user && (
            <>
              <Link
                href="/auth/signin"
                className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-200 bg-[--primary] rounded-lg py-3 px-4 mx-1 font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/auth/signup"
                className="w-24 flex justify-center align-center text-base cursor-pointer text-slate-500 font-medium"
              >
                Cadastrar-se
              </Link>
            </>
          )}
        </div>
      </nav> */}
      <Disclosure as="nav" className="bg-slate-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Abrir menu principal</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-[--primary] text-white"
                              : "text-slate-500 hover:bg-[--primary] hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {user && (
                  <>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <button
                        type="button"
                        className="relative rounded-full bg-slate-100 p-1 text-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Notificações</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">
                              Abrir menu do usuário
                            </span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.photoURL}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="flex items-center p-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.photoURL}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-xs font-medium leading-none text-slate-400">
                                  {user.displayName}
                                </div>
                                <div className="text-xs font-medium leading-none text-slate-400">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-[--primary] text-slate-100"
                        : "text-slate-500 hover:bg-[--primary] hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
