import {
  CloudArrowUpIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useCollection } from "../hooks/useCollection";
import { Collection } from "../models/collection";
import { useEffect, useState } from "react";
import { StyledFab } from "../components/StyledFAB";
import { Modal } from "../components/Modal";
import { StyledInput } from "../components/StyledInput";
import { useCrud } from "../hooks/useCrud";
import { StyledSubmit } from "../components/StyledSubmit";
import { DataTable } from "../components/DataTable";
import { IconButton } from "../components/IconButton";

const ManageUsers = () => {
  const users = useCollection(Collection.users);
  const { create, update, destroy } = useCrud(Collection.users);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const openNewUserModal = () => setNewUserModalOpen(true);
  console.log("users", users);
  const [editId, setEditId] = useState("");
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const editUser = ({ id, email, firstName, lastName }: UserData) => {
    setEditId(id);
    setData({
      email,
      firstName,
      lastName,
    });
    setNewUserModalOpen(true);
  };
  useEffect(() => {
    if (newUserModalOpen === false) {
      setEditId("");
      setData({ email: "", firstName: "", lastName: "" });
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
                  onClick={() => destroy(user.id)}
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
      <Modal
        open={newUserModalOpen}
        setOpen={setNewUserModalOpen}
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
          onChange={(e) =>
            setData({ ...data, firstName: e.currentTarget.value })
          }
        />
        <StyledInput
          label="Last Name"
          value={data.lastName}
          onChange={(e) =>
            setData({ ...data, lastName: e.currentTarget.value })
          }
        />
        <StyledSubmit
          icon={<CloudArrowUpIcon />}
          onClick={async () => {
            if (editId) {
              await update(editId, { ...data }).then(() => {
                setNewUserModalOpen(false);
              });
            } else {
            }
            await create(data).then(() => {
              setNewUserModalOpen(false);
            });
          }}
          label={editId ? "Update User" : "Create User"}
        />
      </Modal>
    </>
  );
};

export default ManageUsers;
