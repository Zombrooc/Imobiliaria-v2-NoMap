import { Suspense } from "react";

import Loading from "@/app/loading";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PropertyList from "@/components/PropertyList";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header> */}
      <main>
        <Sidebar />
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row w-screen min-w-full h-screen min-h-full">
            <main className="w-full p-10 overflow-y-scroll">
              <Suspense fallback={<Loading />}>
                <PropertyList />
              </Suspense>
            </main>
          </div>
        </div>
      </main>
    </>
  );
}
