import Navbar from "@/components/Navbar"

export default function PropertiesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}