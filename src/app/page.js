import { Suspense } from "react";

import Loading from "@/app/loading";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PropertyList from "@/components/PropertyList";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row w-screen min-w-full h-screen min-h-full">
        <Sidebar />
        <main className="w-full p-10 overflow-y-scroll">
          <Suspense fallback={<Loading />}>
            <PropertyList />
          </Suspense>
        </main>
      </div>
    </>
  );
}
