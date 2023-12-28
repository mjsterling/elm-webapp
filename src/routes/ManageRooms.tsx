import {
  PencilIcon,
  SquaresPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useCollection, useCrud } from "../hooks";
import { Collection } from "../models/collection";
import { useState } from "react";
import {
  ConfirmModalProps,
  DataTable,
  IconButton,
  Modal,
  StyledCheckbox,
  StyledFab,
  StyledInput,
} from "../components";
import PawIcon from "../assets/dog-paw.png";
import WheelchairIcon from "../assets/wheelchair-icon.png";
import clsx from "clsx";
import { useConfirmModal } from "../providers/ConfirmModalProvider";
import { DocumentData } from "firebase/firestore";
import { StyledDropdown } from "../components/StyledDropdown";

const Rooms = () => {
  const { confirm } = useConfirmModal();
  const [roomData, setRoomData] = useState<
    Partial<Omit<Room, "roomType"> & { roomType: string }>
  >({});
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const rooms = useCollection(Collection.rooms);
  const roomTypes = useCollection(Collection.roomtypes);
  const { create, update, destroy } = useCrud(Collection.rooms);

  const editRoom = (room: DocumentData) => {
    setRoomData({ ...room });
    setNewRoomModalOpen(true);
  };
  const headers = {
    roomNumber: "#",
    type: "Type",
    amenities: "Amenities",
    actions: "Actions",
  };
  console.log(roomData);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 pb-24">
      <div className="flex w-full justify-center">
        <h1>Rooms</h1>
      </div>
      <DataTable
        data={rooms.map((room) => {
          const {
            id,
            roomNumber,
            roomType,
            petsAllowed,
            wheelchairAccessible,
          } = room;
          return {
            roomNumber,
            roomType,
            amenities: (
              <div className="flex gap-2">
                <img
                  className={clsx(
                    "h-5",
                    petsAllowed ? "opacity-100" : "opacity-25"
                  )}
                  src={PawIcon}
                />
                <img
                  className={clsx(
                    "h-5",
                    wheelchairAccessible ? "opacity-100" : "opacity-25"
                  )}
                  src={WheelchairIcon}
                />
              </div>
            ),
            actions: (
              <div className="flex gap-1">
                <IconButton
                  icon={<PencilIcon />}
                  onClick={() => editRoom(room as Room)}
                />
                <IconButton
                  icon={<TrashIcon />}
                  onClick={() => {
                    confirm({
                      onConfirm: () => {
                        destroy(id);
                      },
                      heading: "Confirm Room Deletion",
                      body: `Are you sure you wish to delete room ${room.roomNumber}?`,
                    });
                  }}
                />
              </div>
            ),
          };
        })}
        headers={headers}
      />
      <StyledFab
        onClick={() => setNewRoomModalOpen(true)}
        icon={<SquaresPlusIcon />}
        label="Add New Room"
        className="fixed right-4 bottom-4"
      />
      <Modal
        className="flex flex-col gap-2"
        open={newRoomModalOpen}
        setOpen={setNewRoomModalOpen}
        title={roomData.id ? "Edit Room" : "New Room"}
      >
        <StyledInput
          label="Room Number"
          value={roomData.roomNumber}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              roomNumber: parseInt(e.currentTarget.value),
            })
          }
        />
        <StyledDropdown
          label="Room Type"
          options={roomTypes.map((type) => type.name)}
          value={roomData.roomType ?? ""}
          onSelect={(value) => {
            console.log("value in onselect", value);
            setRoomData({ ...roomData, roomType: value });
          }}
        />
        <StyledCheckbox
          label="Pets Allowed"
          checked={!!roomData.petsAllowed}
          onChange={() =>
            setRoomData({
              ...roomData,
              petsAllowed: !!!roomData.petsAllowed,
            })
          }
        />
        <StyledCheckbox
          label="Wheelchair Accessible"
          checked={!!roomData.wheelchairAccessible}
          onChange={() =>
            setRoomData({
              ...roomData,
              wheelchairAccessible: !!!roomData.wheelchairAccessible,
            })
          }
        />
      </Modal>
    </div>
  );
};

export default Rooms;
