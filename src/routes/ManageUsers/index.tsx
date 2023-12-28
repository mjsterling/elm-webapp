import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useCollection } from "../../hooks/useCollection";
import { Collection } from "../../models/collection";
import { useEffect, useState } from "react";
import { StyledFab } from "../../components/StyledFAB";
import { useCrud } from "../../hooks/useCrud";
import { DataTable } from "../../components/DataTable";
import { IconButton } from "../../components/IconButton";
import { NewUserModal } from "./NewUserModal";
import { useConfirmModal } from "../../providers/ConfirmModalProvider";

const ManageUsers = () => {
  const { confirm } = useConfirmModal();
  const users = useCollection(Collection.users);
  const { destroy } = useCrud(Collection.users);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
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
      <div className="h-full w-full justify-start items-center flex flex-col gap-4 p-8 relative">
        <h1>User Management</h1>
        <DataTable
          headers={{
            email: "Email Address",
            name: "Name",
            actions: "Actions",
          }}
          data={users.map((user) => ({
            email: user.email,
            name: user.firstName + " " + user.lastName,
            actions: (
              <div className="flex gap-1">
                <IconButton
                  icon={<PencilIcon />}
                  onClick={() => editUser(user as UserData)}
                />
                <IconButton
                  icon={<TrashIcon />}
                  onClick={() => {
                    confirm({
                      onConfirm: () => {
                        destroy(user.id);
                      },
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
          className="absolute right-4 bottom-4"
        />
      </div>
      <NewUserModal
        open={newUserModalOpen}
        setOpen={setNewUserModalOpen}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default ManageUsers;
