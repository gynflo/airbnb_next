import { Nunito } from "next/font/google";

import "./globals.css";
// Components
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";

// Providers
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Airbnb Clone via Next",
  description: "Un exercice pour appréhender next.js",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="fr">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-28 pb-20">{children}</div>
      </body>
    </html>
  );
}
