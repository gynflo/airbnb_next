"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  substitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "Aucune correspondance exacte",
  substitle = "Essayez de modifier ou de supprimer certaines valeurs du filtre",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={substitle} center />
      <div className="w-56 mt-4">
        {showReset && (
          <Button outline label="Supprimer tous les filtres" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
