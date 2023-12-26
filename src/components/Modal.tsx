import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type Modal = React.FC<ModalProps>;

export const Modal: Modal = ({
  open,
  setOpen,
  children,
  className,
  ...props
}) => {
  const closeModal = () => setOpen(false);
  return open ? (
    <div
      className="fixed left-0 h-screen w-screen top-0 z-50 bg-[#0003] cursor-pointer flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white rounded h-fit w-fit relative p-4 z-[60] cursor-default",
          className
        )}
        {...props}
      >
        <button onClick={closeModal} className="absolute right-2 top-2">
          <XMarkIcon className="h-4 w-4 text-black" />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};
