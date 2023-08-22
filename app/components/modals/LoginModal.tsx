"use client";

import {signIn} from 'next-auth/react';
import { useState} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
//Hooks
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
//Components
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
// Icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";




const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false);

      if(callback?.ok) {
        toast.success('Connecté !');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error) {
        toast.error('Veuillez vérifier vos identifiants');
      }
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bienvenue sur Airbnb" subtitle="Connexion à votre compte" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />    
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <hr />
      <Button
        outline
        label="Continuer avec Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continuer avec Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
          "
      >
        <div className="flex items-center justify-center gap-2">
          <div>Pas encore de compte ?</div>
          <div
            onClick={registerModal.onOpen}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Inscription
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Connexion"
      actionLabel="Continuer"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
