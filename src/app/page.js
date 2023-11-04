import { Suspense } from "react";

import Loading from "@/app/loading";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PropertyList from "@/components/PropertyList";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row w-screen min-w-full h-screen min-h-full">
          <main className="w-full p-10 overflow-y-scroll">
            <Suspense fallback={<Loading />}>
              <PropertyList />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
