import { Nunito } from "next/font/google";

import "./globals.css";
// Components
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/modals/Modal";

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
        <ClientOnly>
          <Modal isOpen title="Hello World" actionLabel="Submit" />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
