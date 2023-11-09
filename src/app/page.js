"use client";

import { Suspense, useState } from "react";
import { Dialog } from "@headlessui/react";

import Loading from "@/app/loading";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PropertyList from "@/components/PropertyList";

export default function Home() {
  const [createPropertyModal, setCreatePropertyModal] = useState(false);

  return (
    <>
      <Navbar />
      <main className="w-full p-6">
        <Suspense fallback={<Loading />}>
          <PropertyList />
        </Suspense>
      </main>
      <Dialog
        open={createPropertyModal}
        onClose={() => setCreatePropertyModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel>
            <Dialog.Title>Deactivate account</Dialog.Title>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>

            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>

            <button onClick={() => setCreatePropertyModal(false)}>
              Deactivate
            </button>
            <button onClick={() => setCreatePropertyModal(false)}>
              Cancel
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div
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
      </div>
    </>
  );
}
