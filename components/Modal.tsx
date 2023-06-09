import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 px-50 outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full my-6 mx-auto lg:w-3/6 lg:max-w-3xl h-full lg:h-auto ">
          {/* Content */}
          <div
            className="h-full
          lg:h-auto
          border-0
          rounded-lg
          shadow-lg
          relative 
          flex
          flex-col
          w-full
          bg-black
          outline-none
          focus:outline-none
          "
          >
            {/* Header */}
            <div
              className="
            flex
            items-center
            justify-center
            p-10
            rounded-t
            "
            >
              <h3 className="text-3xl text-white font-semibold">{title}</h3>
              <button
                className="
         p-1
         ml-auto
         border-0
         text-white
         hover:opacity-70
         transition
         "
              >
                <AiOutlineClose onClick={handleClose} size={20} color="white" />
              </button>
            </div>

            {/* body */}
            <div className="relative p-10 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                outline={false}
                label={actionLabel}
                secondary
                fullwidth
                large
                onClick={handleSubmit}
              />
            {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
