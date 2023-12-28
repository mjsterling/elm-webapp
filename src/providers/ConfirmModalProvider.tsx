import React, { useContext, useState } from "react";
import { ConfirmModal, ConfirmModalProps } from "../components";

const ConfirmModalContext = React.createContext<{
  confirm: (props: ConfirmModalProps) => void;
  close(): void;
}>({
  confirm: () => {},
  close: () => {},
});

export const ConfirmModalProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [confirmProps, setConfirmProps] = useState<ConfirmModalProps | null>(
    null
  );
  const close = () => {
    setConfirmProps(null);
  };
  const confirm = (props: ConfirmModalProps) => {
    setConfirmProps(props);
  };
  return (
    <ConfirmModalContext.Provider value={{ confirm, close }}>
      {confirmProps ? <ConfirmModal {...confirmProps} /> : null}
      {children}
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModal = () => useContext(ConfirmModalContext);
