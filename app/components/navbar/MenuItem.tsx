"use client";

import clsx from "clsx";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "px-4 py-3 hover:bg-neutral-100 transition font-semibold",
        className
      )}
    >
      {label}
    </div>
  );
};

export default MenuItem;
