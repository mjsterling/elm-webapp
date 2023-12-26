import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useCollection } from "../../hooks/useCollection";
import { Collection } from "../../models/collection";
import { useEffect, useState } from "react";
import { StyledFab } from "../../components/StyledFAB";
import { useCrud } from "../../hooks/useCrud";
import { DataTable } from "../../components/DataTable";
import { IconButton } from "../../components/IconButton";
import { ConfirmModal, ConfirmModalProps } from "../../components/ConfirmModal";
import { NewUserModal } from "./NewUserModal";

const ManageUsers = () => {
  const users = useCollection(Collection.users);
  const { destroy } = useCrud(Collection.users);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [confirmModalProps, setConfirmModalProps] =
    useState<ConfirmModalProps>();
  const openNewUserModal = () => setNewUserModalOpen(true);
  const [data, setData] = useState<Partial<UserData>>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const editUser = ({ id, email, firstName, lastName }: UserData) => {
    setData({
      id,
      email,
      firstName,
      lastName,
    });
    setNewUserModalOpen(true);
  };
  useEffect(() => {
    if (newUserModalOpen === false) {
      setData({ id: "", email: "", firstName: "", lastName: "" });
    }
  }, [newUserModalOpen]);
  return (
    <>
      <div className="h-full w-full justify-center items-center flex flex-col gap-4 p-8 relative">
        <h1>User Management</h1>
        <DataTable
          headers={{
            email: "Email Address",
            firstName: "First Name",
            lastName: "Last Name",
            actions: "Actions",
          }}
          data={users?.map((user) => ({
            ...user,
            actions: (
              <div className="flex gap-1">
                <IconButton
                  icon={<PencilIcon />}
                  onClick={() => editUser(user as UserData)}
                />
                <IconButton
                  icon={<TrashIcon />}
                  onClick={() => {
                    setConfirmModalProps({
                      open: true,
                      setOpen: setConfirmDeleteModalOpen,
                      onConfirm: () => {
                        destroy(user.id);
                        setConfirmModalProps(undefined);
                      },
                      onDecline: () => setConfirmModalProps(undefined),
                      heading: "Confirm User Deletion",
                      body: `Are you sure you wish to delete user ${user.firstName} ${user.lastName}?`,
                    });
                  }}
                />
              </div>
            ),
          }))}
        />
        <StyledFab
          onClick={openNewUserModal}
          icon={<UserPlusIcon />}
          label="Add New User"
          className="absolute right-8 bottom-8"
        />
      </div>
      <NewUserModal
        open={newUserModalOpen}
        setOpen={setNewUserModalOpen}
        data={data}
        setData={setData}
      />
      {confirmModalProps ? <ConfirmModal {...confirmModalProps} /> : null}
    </>
  );
};

export default ManageUsers;
