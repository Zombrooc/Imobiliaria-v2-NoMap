import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Imobiliaria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`bg-slate-50 h-screen ${inter.className} relative`}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
