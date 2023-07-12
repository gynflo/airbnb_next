import { Nunito } from "next/font/google";

import "./globals.css";

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
