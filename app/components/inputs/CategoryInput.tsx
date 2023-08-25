"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  title: string;
  icon: IconType;
}

const CategoryInput = ({
  onClick,
  selected,
  label,
  title,
  icon: Icon,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => {
        onClick(label);
      }}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold">{title}</div>
    </div>
  );
};

export default CategoryInput;
