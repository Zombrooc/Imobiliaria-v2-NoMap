import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Template({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-row w-screen min-w-full h-screen min-h-full">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
