import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: Function;
  children: React.ReactNode;
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type Modal = React.FC<ModalProps>;

export const Modal: Modal = ({
  open,
  setOpen,
  children,
  onClose,
  className,
  title,
  ...props
}) => {
  const closeModal = () => setOpen(false);
  return open ? (
    <div
      className="fixed left-0 h-screen w-screen top-0 z-50 bg-[#0003] cursor-pointer flex justify-center items-center"
      onClick={() => {
        closeModal();
        onClose?.();
      }}
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
        {title ? <h3 className="w-full text-center my-2">{title}</h3> : null}
        {children}
      </div>
    </div>
  ) : null;
};
