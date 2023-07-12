import { Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Airbnb Clone via Next",
  description: "Un exercice pour apréhender next.js",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
