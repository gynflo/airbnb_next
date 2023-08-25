"use client";

import useRentModal from "@/hooks/useRentModal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

/* Components */
import Heading from "../Heading";
import Modal from "./Modal";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // (watch )Surveille les champs et retourne leurs valeurs.
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../map/Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("🚀 ~ file: RentModal.tsx:92 ~ RentModal ~ data:", data);
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Annonce crée");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Quelque chose s'est mal passée. Enregistrement annulé !");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Créer";
    }
    return "Suivant";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Retour";
  }, [step]);

  /* bodyContent initialize step === CATEGORY*/
  let bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading
        title="Lequels de ces termes décrit le mieux votre résidence ?"
        subtitle="Choissisez une catégorie"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
              title={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );

  /* bodyContent  step === LOCATION*/
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ou se trouve votre logement ?"
          subtitle="Aider les clients à vous trouver !"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  /* bodyContent step === INFO*/
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Partagez quelques informations de base sur votre logement"
          subtitle="Quels sont les équipements dont vous disposez ?"
        />
        <Counter
          title="Invités"
          subtitle="Combien d'invités pouvez-vous accueillir ?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue("guestCount", value);
          }}
        />
        <hr />
        <Counter
          title="Chambres"
          subtitle="Combien de chambres possédez-vous ?"
          value={roomCount}
          onChange={(value) => {
            setCustomValue("roomCount", value);
          }}
        />
        <hr />
        <Counter
          title="Salle de bains"
          subtitle="Combien de salle de bains possédez-vous ?"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValue("bathroomCount", value);
          }}
        />
        <hr />
      </div>
    );
  }

  /* bodyContent step === UPLOAD IMAGES*/
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ajouter une photo de votre logement"
          subtitle="Montrez à vos invités le potentiel de votre logement"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  /* bodyContent step === DESCRIPTION*/
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Comment décrivez-vous votre logement ?"
          subtitle="Soyez concis !"
        />
        <Input
          id="title"
          label="Titre"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  /* bodyContent step === PRICE*/
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Maintenant, indiquez votre prix ! "
          subtitle="Combien coûte une nuitée par personne ?"
        />
        <Input
          id="price"
          label="Prix"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      title="Mettre mon logement sur Airbnb"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RentModal;
