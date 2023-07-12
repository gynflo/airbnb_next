"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      alt="Illustration du logo de l'utilisateur"
      height="30"
      width="30"
      src="/images/placeholder.jpg"
    />
  );
};

export default Avatar;
