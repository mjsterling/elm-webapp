import { Modal } from "./Modal";
import { StyledButton } from "./StyledButton";

export type ConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: Function;
  onDecline?: Function;
  heading: string;
  body: string;
};

type ConfirmModal = React.FC<ConfirmModalProps>;

export const ConfirmModal: ConfirmModal = ({
  open,
  setOpen,
  onConfirm,
  onDecline,
  heading,
  body,
}) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      onClose={() => {
        onDecline?.();
      }}
      className="flex flex-col gap-2 border-2 border-red-600"
    >
      <h5 className="h-6 p-2 text-center w-full text-lg font-semibold text-black flex justify-center items-center">
        {heading}
      </h5>
      <p className="p-2 text-center">{body}</p>
      <div className="flex justify-evenly items-center p-2">
        <StyledButton
          theme="error"
          onClick={() => {
            onConfirm();
          }}
          label="I said DO IT!"
        />
        <StyledButton
          theme="primary"
          onClick={() => {
            onDecline?.();
            setOpen(false);
          }}
          label="Wait, nah..."
        />
      </div>
    </Modal>
  );
};
