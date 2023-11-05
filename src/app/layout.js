import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Imobiliaria",
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`bg-slate-50 h-full max-w-screen ${inter.classes}`}>
        {children}
      </body>
    </html>
  );
}