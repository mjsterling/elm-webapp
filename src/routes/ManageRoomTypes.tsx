import {
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  PencilIcon,
  SquaresPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useCollection, useCrud } from "../hooks";
import { Collection } from "../models/collection";
import { useEffect, useState } from "react";
import {
  DataTable,
  IconButton,
  Modal,
  PlusMinusSelector,
  StyledButton,
  StyledFab,
  StyledInput,
} from "../components";
import { useConfirmModal } from "../providers/ConfirmModalProvider";
import { DocumentData } from "firebase/firestore";

const ManageRoomTypes = () => {
  const { confirm } = useConfirmModal();
  const [roomData, setRoomData] = useState<Partial<RoomType>>({});
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const roomTypes = useCollection(Collection.roomtypes);
  const { create, update } = useCrud(Collection.roomtypes);

  const calculateCapacity = () =>
    [
      (roomData.beds_double ?? 0) * 2,
      (roomData.beds_king ?? 0) * 2,
      (roomData.beds_queen ?? 0) * 2,
      roomData.beds_single ?? 0,
    ].reduce((a, b) => a + b, 0);

  useEffect(() => {
    setRoomData({ ...roomData, capacity: calculateCapacity() });
  }, [
    roomData.beds_double,
    roomData.beds_king,
    roomData.beds_queen,
    roomData.beds_single,
  ]);

  const editRoom = (room: DocumentData) => {
    setRoomData({ ...room });
    setNewRoomModalOpen(true);
  };
  const headers = {
    name: "Name",
    beds: "Beds",
    prices: "Prices",
    actions: "Actions",
  };

  const BedsDisplay = ({
    beds_single,
    beds_double,
    beds_queen,
    beds_king,
  }: RoomType) => {
    const displayArray = [];
    if (beds_king) {
      displayArray.push(beds_king + " ♚");
    }
    if (beds_queen) {
      displayArray.push(beds_queen + " ♛");
    }
    if (beds_double) {
      displayArray.push(beds_double + " ♟♟");
    }
    if (beds_single) {
      displayArray.push(beds_single + " ♟");
    }
    return displayArray.length ? displayArray.join(" · ") : "No beds";
  };

  const PricesDisplay = ({ price_peak, price_offpeak }: RoomType) => {
    const displayArray = [];
    if (price_peak) {
      displayArray.push("$" + price_peak);
    }
    if (price_offpeak) {
      displayArray.push("$" + price_offpeak);
    }
    return displayArray.length ? displayArray.join(" · ") : "No prices";
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 pb-24">
      <div className="flex w-full justify-center">
        <h1>Room Types</h1>
      </div>
      <DataTable
        data={roomTypes.map((roomType) => {
          return {
            name: roomType.name,
            beds: BedsDisplay(roomType as RoomType),
            prices: PricesDisplay(roomType as RoomType),
            actions: (
              <div className="flex gap-1">
                <IconButton
                  icon={<PencilIcon />}
                  onClick={() => editRoom(roomType as RoomType)}
                />
                <IconButton
                  icon={<TrashIcon />}
                  onClick={() => {
                    confirm({
                      onConfirm: () => {
                        roomType.id;
                      },
                      heading: "Confirm Room Type Deletion",
                      body: `Are you sure you wish to delete ${roomType.name}?`,
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
        label="Add New Room Type"
        className="fixed right-4 bottom-4"
      />
      <Modal
        className="flex flex-col gap-2"
        open={newRoomModalOpen}
        setOpen={setNewRoomModalOpen}
        title={roomData.id ? "Edit Room Type" : "New Room Type"}
      >
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Room Type
        </h4>
        <StyledInput
          label="Room Type Name"
          value={roomData.name}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              name: e.currentTarget.value,
            })
          }
        />
        <StyledInput
          label="Room Type Description"
          value={roomData.description}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              description: e.currentTarget.value,
            })
          }
        />
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Beds
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <PlusMinusSelector
            label="Total Capacity"
            value={roomData.capacity ?? 0}
            setValue={(val) => setRoomData({ ...roomData, capacity: val })}
            max={10}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <PlusMinusSelector
            label="Single Beds"
            value={roomData.beds_single ?? 0}
            setValue={(val) => setRoomData({ ...roomData, beds_single: val })}
            min={0}
            max={5}
          />
          <PlusMinusSelector
            label="Double Beds"
            value={roomData.beds_double ?? 0}
            setValue={(val) => setRoomData({ ...roomData, beds_double: val })}
            min={0}
            max={5}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <PlusMinusSelector
            label="Queen Beds"
            value={roomData.beds_queen ?? 0}
            setValue={(val) => setRoomData({ ...roomData, beds_queen: val })}
            min={0}
            max={5}
          />
          <PlusMinusSelector
            label="King Beds"
            value={roomData.beds_king ?? 0}
            setValue={(val) => setRoomData({ ...roomData, beds_king: val })}
            min={0}
            max={5}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <StyledInput
            label="Price (Peak)"
            startIcon={<CurrencyDollarIcon className="h-4 w-4" />}
            value={roomData.price_peak}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                price_peak: parseInt(e.currentTarget.value),
              })
            }
          />
          <StyledInput
            label="Price (Off Peak)"
            startIcon={<CurrencyDollarIcon className="h-4 w-4" />}
            value={roomData.price_offpeak}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                price_offpeak: parseInt(e.currentTarget.value),
              })
            }
          />
        </div>
        <div className="flex w-full justify-center">
          <StyledButton
            startIcon={<CloudArrowUpIcon />}
            onClick={async () => {
              if (roomData.id) {
                await update(roomData).then(() => {
                  setNewRoomModalOpen(false);
                  setRoomData({});
                });
              } else {
                await create(roomData).then(() => {
                  setNewRoomModalOpen(false);
                  setRoomData({});
                });
              }
            }}
            label={roomData.id ? "Update Room Type" : "Create Room Type"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ManageRoomTypes;
