"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/lib/firebase";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import ProfilePic from "@/assets/user-default-profile-pic.jpg";

const userNavigation = [
  { name: "Seu Perfil", href: "#" },
  { name: "Configurações", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState([
    { name: "Ínicio", href: "/", current: true },
    { name: "Comprar", href: "#", current: false },
    { name: "Vender", href: "#", current: false },
    { name: "Alugar", href: "#", current: false },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          photoURL: user?.photoURL,
          email: user.email,
        });
      }
    });
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
                  <div className="flex flex-shrink-0 items-center w-8 h-8 relative">
                    <Image
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                      fill
                      sizes="10vw"
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
                {user ? (
                  <>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">
                              Abrir central de notificações
                            </span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        {/* <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-[--white] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="block py-2 px-4 text-base font-medium text-center text-[--black] bg-gray-50  ">
                              Notificações
                            </div>
                            <div>
                              <Menu.Item>
                                <Link
                                  href="#"
                                  className="flex py-3 px-4 border-b hover:bg-gray-100 "
                                >
                                  <div className="flex-shrink-0">
                                    <Image
                                      className="w-11 h-11 rounded-full"
                                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                      alt="User Profile Pic"
                                      width={44}
                                      height={44}
                                    />
                                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                                      <svg
                                        className="w-2 h-2 text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                      >
                                        <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="pl-3 w-full">
                                    <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                                      New message from{" "}
                                      <span className="font-semibold text-gray-90">
                                        Bonnie Green
                                      </span>
                                      : Hey, whats up? All set for the
                                      presentation?
                                    </div>
                                    <div className="text-xs font-medium text-[--black]">
                                      a few moments ago
                                    </div>
                                  </div>
                                </Link>
                              </Menu.Item>
                            </div>
                            <a
                              href="#"
                              className="block py-2 text-base font-medium text-center text-[--black] bg-gray-50 hover:bg-gray-100  "
                            >
                              <div className="inline-flex items-center ">
                                <svg
                                  aria-hidden="true"
                                  className="mr-2 w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                  <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                Ver todas
                              </div>
                            </a>
                          </Menu.Items>
                        </Transition> */}
                      </Menu>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">
                              Abrir menu do usuário
                            </span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              src={user.photoURL || ProfilePic}
                              alt="User Profile Pic"
                              width={32}
                              height={32}
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-[--white] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="flex items-center p-3">
                              <div className="flex-shrink-0">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src={user.photoURL || ProfilePic}
                                  alt=""
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-base font-medium leading-none text-slate-400">
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
                                      "block px-4 py-2 text-sm text-[--black]"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              <a
                                className="block px-4 py-2 text-sm text-[--black] cursor-pointer hover:bg-gray-100"
                                onClick={() => handleLogout()}
                              >
                                Sair
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </>
                ) : (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 flex space-x-4">
                      <a
                        href="/auth/signin"
                        className="text-slate-500 hover:bg-[--primary] hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Entrar
                      </a>
                      <a
                        href="/auth/signup"
                        className="bg-[--primary] text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Cadastrar-se
                      </a>
                    </div>
                  </div>
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
                {!user && (
                  <>
                    <Disclosure.Button
                      as="a"
                      href="/auth/signin"
                      className="text-slate-500 hover:bg-[--primary] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Entrar
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="/auth/signup"
                      className="bg-[--primary] text-slate-100 block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Registrar-se
                    </Disclosure.Button>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
