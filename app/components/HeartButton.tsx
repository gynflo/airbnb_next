"use client";

import { SafeUser } from "@/types";
import clsx from "clsx";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const hasFavorited = false;
  const toggleFavorite = (e: any) => {
    e.stopPropagation(); // evite de se rendre sur la fiche produit 
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={(e) => {
        toggleFavorite(e);
      }}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={clsx(
          hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
        )}
      />
    </div>
  );
};

export default HeartButton;
{
}
