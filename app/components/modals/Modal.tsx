"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;

  secondaryAction?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryActionLabel,
  onClose,
  onSubmit,
  secondaryAction,
}) => {
  const [showmodal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
            flex
            items-center
            justify-center
            overflow-x-hidden
            overflow-y-hidden
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70

        "
      >
        <div
          className="
                relative
                w-full
                md:w-4/6
                lg:w-3-6
                xl:w-2/5
                my-6
                mx-auto
                h-full
                md:h-auto
                lg:h-auto

            "
        >
          {/* CONTENT */}
          <div
            className={`
                    translate
                    duration-300
                    h-full
                    ${showmodal ? "translate-y-0" : "translate-y-full"}
                    ${showmodal ? "opacity-100" : "opacity-0"}
                `}
          >
            <div
              className="
                relative
                flex
                flex-col
                h-full
                md:h-auto
                lg:h-auto
                border-0
                rounded-lg
                shadow-lg
                w-full
                bg-white
                outline-none
                focus:outline-none

            "
            >
              {/* HEADER */}
              <div
                className="
                    relative
                    flex
                    items-center
                    justify-center
                    p-6
                    rounded-t
                    border-b-[1px]
                    
                "
              >
                <button
                  className="
                        absolute
                        left-9
                        p-1
                        border-0
                        hover:opacity-70
                        transition"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                        flex
                        items-center
                        gap-4
                        w-full"
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;