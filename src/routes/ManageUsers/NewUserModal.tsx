import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import { Modal } from "../../components/Modal";
import { StyledInput } from "../../components/StyledInput";
import { StyledSubmit } from "../../components/StyledSubmit";
import { useCrud } from "../../hooks/useCrud";
import { Collection } from "../../models/collection";

type NewUserModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Partial<UserData>;
  setData: React.Dispatch<React.SetStateAction<Partial<UserData>>>;
};

type NewUserModal = React.FC<NewUserModalProps>;

export const NewUserModal: NewUserModal = ({
  open,
  setOpen,
  data,
  setData,
}) => {
  const { create, update } = useCrud(Collection.users);
  return (
    <Modal
      title={data.id ? "Edit User" : "Create New User"}
      open={open}
      setOpen={setOpen}
      className="flex flex-col gap-3"
    >
      <StyledInput
        label="Email Address"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.currentTarget.value })}
      />
      <StyledInput
        label="First Name"
        value={data.firstName}
        onChange={(e) => setData({ ...data, firstName: e.currentTarget.value })}
      />
      <StyledInput
        label="Last Name"
        value={data.lastName}
        onChange={(e) => setData({ ...data, lastName: e.currentTarget.value })}
      />
      <StyledSubmit
        icon={<CloudArrowUpIcon />}
        onClick={async () => {
          if (data.id) {
            await update(data.id, { ...data }).then(() => {
              setOpen(false);
            });
          } else {
          }
          await create(data).then(() => {
            setOpen(false);
          });
        }}
        label={data.id ? "Update User" : "Create User"}
      />
    </Modal>
  );
};
