import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { useCollection } from "../hooks";
import { Collection } from "../models/collection";
import { useState } from "react";
import { DataTable, StyledFab } from "../components";

const Rooms = () => {
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const rooms = useCollection(Collection.rooms);
  const headers = {
    roomNumber: "Room Number",
    roomType: "Room Type",
    petsAllowed: "Pets Allowed",
    wheelchairAccessible: "Wheelchair Access",
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 pb-24">
      <div className="flex w-full justify-center">
        <h1>Rooms</h1>
      </div>
      <DataTable data={rooms} headers={headers} />
      <StyledFab
        onClick={() => setNewRoomModalOpen(true)}
        icon={<SquaresPlusIcon />}
        label="Add New Room"
        className="fixed right-8 bottom-8"
      />
    </div>
  );
};

export default Rooms;
