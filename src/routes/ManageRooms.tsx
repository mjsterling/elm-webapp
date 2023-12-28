import {
  CloudArrowUpIcon,
  PencilIcon,
  SquaresPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useCollection, useCrud } from "../hooks";
import { Collection } from "../models/collection";
import { useState } from "react";
import {
  DataTable,
  IconButton,
  Modal,
  StyledButton,
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
  const [roomData, setRoomData] = useState<Partial<Room>>({});
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
    roomType: "Type",
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
              <div className="flex gap-4">
                <img
                  className={clsx(
                    "h-4",
                    petsAllowed ? "opacity-100" : "opacity-25"
                  )}
                  src={PawIcon}
                />
                <img
                  className={clsx(
                    "h-4",
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
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Room Info
        </h4>
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
            setRoomData({ ...roomData, roomType: value });
          }}
        />
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Amenities
        </h4>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <StyledButton
            startIcon={<CloudArrowUpIcon />}
            onClick={async () => {
              if (roomData.id) {
                await update(roomData).then(() => {
                  setRoomData({});
                  setNewRoomModalOpen(false);
                });
              } else {
                await create(roomData).then(() => {
                  setRoomData({});
                  setNewRoomModalOpen(false);
                });
              }
            }}
            label={roomData.id ? "Update Room" : "Create Room"}
          />
          {roomData.id ? (
            <StyledButton
              startIcon={<TrashIcon />}
              onClick={() => {
                confirm({
                  onConfirm: async () => {
                    setRoomData({});
                    await destroy(roomData.id!);
                    setNewRoomModalOpen(false);
                  },
                  heading: "Confirm room deletion",
                  body: `Are you sure you want to delete room ${roomData.roomNumber}?`,
                });
              }}
              label="Delete Room"
              theme="error"
              mode="outlined"
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default Rooms;
