"use client";

import type { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
/* Components */
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
/* Hooks */
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="
                hidden 
                md:block 
                text-sm 
                font-semibold 
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer"
        >
          Mettre mon logement sur Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                items-center
                gap-3
                rounded-full
                hover:shadow-md
                transition
                cursor-pointer"
        >
          <AiOutlineMenu />
          <div
            className="
                hidden md:block
            "
          >
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
                absolute
                top-20
                right-0
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                text-sm"
        >
          <div
            className="
                    flex
                    flex-col
                    cursor-pointer"
          >
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {}}
                  label="Mes voyages"
                  className="font-extrabold"
                />
                <MenuItem onClick={() => {}} label="Mes favoris" />
                <MenuItem onClick={() => {}} label="Mes réservations" />
                <MenuItem onClick={() => {}} label="Mes propriétés" />
                <MenuItem onClick={rentModal.onOpen} label="Mettre mon logement sur Airbnb" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Déconnexion" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Inscription"
                  className="font-extrabold"
                />
                <MenuItem onClick={loginModal.onOpen} label="Connexion" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
