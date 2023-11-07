import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Imobiliaria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`bg-slate-50 h-full ${inter.className}`}>
        {children}
        <div className="w-64 h-64 absolute r-3 b-3 rounded-full bg-[--primary] text-[--white]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </div>
      </body>
    </html>
  );
}
