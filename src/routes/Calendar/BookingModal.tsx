import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import { Collection } from "../../models/collection";
import { useCrud } from "../../hooks/useCrud";
import {
  StyledInput,
  PlusMinusSelector,
  StyledCheckbox,
  StyledButton,
  Modal,
  DateRangePicker,
} from "../../components";
import { useCalendarData } from "../../providers/CalendarProvider";
import { BookingDateDisplay } from "./BookingDateDisplay";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { BookingStatusDisplay } from "./BookingStatus";
import { useConfirmModal } from "../../providers/ConfirmModalProvider";
import { useCollection } from "../../hooks";
import { StyledDropdown } from "../../components/StyledDropdown";
import { useMemo } from "react";
import clsx from "clsx";
import { daysSinceEpoch } from "../../utils/dateUtils";

export const BookingModal = () => {
  const {
    bookings,
    bookingModalOpen,
    setBookingModalOpen,
    bookingData,
    setBookingData,
  } = useCalendarData();
  const { create, update, destroy } = useCrud(Collection.bookings);
  const { confirm } = useConfirmModal();
  const addons = useCollection(Collection.addons);

  const setFormData =
    (field: keyof Booking) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setBookingData({ ...bookingData, [field]: e.currentTarget.value });
    };

  const rooms = useCollection(Collection.rooms);
  const sortedRooms = useMemo(
    () => [...rooms].sort((a, b) => a.roomNumber - b.roomNumber),
    [rooms]
  );

  const isRoomAvailableForDates = (room: Room) => {
    const bookingsForRoom = bookings.filter(
      (booking) => booking.room === room.roomNumber
    );
    for (const booking of bookingsForRoom) {
      if (
        booking.endDateAsDays >= daysSinceEpoch(bookingData.startDate) ||
        booking.startDateAsDays <= daysSinceEpoch(bookingData.endDate)
      ) {
        return false;
      }
    }
    return true;
  };

  const roomsWithAvailability = useMemo(() => {
    console.log("recalculating availability");
    return [...sortedRooms].map((room) => ({
      ...(room as Room),
      available: isRoomAvailableForDates(room as Room),
    }));
  }, [sortedRooms, bookingData.startDate, bookingData.endDate]);

  return (
    <>
      <Modal
        open={bookingModalOpen}
        setOpen={setBookingModalOpen}
        title={
          bookingData.id
            ? "Editing Booking for " +
              bookingData.contactFirstName +
              " " +
              bookingData.contactLastName
            : "New Booking"
        }
        className="flex flex-col gap-3"
      >
        <div className="flex justify-center">
          <BookingStatusDisplay />
        </div>
        {/* Room Select */}
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Room
        </h4>
        <div className="flex py-4 flex-wrap gap-3 justify-center items-center">
          {roomsWithAvailability.map((room) => (
            <button
              className={clsx(
                "rounded-full h-10 w-10 transition-colors text-lg font-semibold",
                room.available &&
                  !(bookingData.room === room.roomNumber) &&
                  "border border-blue-700 text-blue-700 bg-white hover:bg-blue-700 hover:text-white",
                !room.available &&
                  !(bookingData.room === room.roomNumber) &&
                  "border border-gray-500 text-gray-500 bg-white",
                bookingData.room === room.roomNumber && "bg-blue-700 text-white"
              )}
              onClick={() =>
                setBookingData({ ...bookingData, room: room.roomNumber })
              }
            >
              {room.roomNumber}
            </button>
          ))}
        </div>
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Dates
        </h4>
        <div className="flex justify-center">
          <BookingDateDisplay
            startDate={bookingData.startDate}
            endDate={bookingData.endDate}
          />
        </div>
        <div className="flex w-full justify-center items-center">
          <DateRangePicker
            startDate={bookingData.startDate}
            endDate={bookingData.endDate}
            setDates={(dates) => {
              setBookingData({ ...bookingData, ...dates });
            }}
          />
        </div>
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Customer Information
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StyledInput
            label="First Name"
            value={bookingData.contactFirstName}
            onChange={setFormData("contactFirstName")}
          />
          <StyledInput
            label="Last Name"
            value={bookingData.contactLastName}
            onChange={setFormData("contactLastName")}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StyledInput
            label="Contact Email Address"
            value={bookingData.contactEmail}
            onChange={setFormData("contactEmail")}
          />
          <StyledInput
            label="Contact Phone Number"
            value={bookingData.contactPhone}
            onChange={setFormData("contactPhone")}
          />
        </div>
        <h4 className="w-full text-center font-semibold mt-4 pt-4 border-t border-t-gray-200">
          Booking Details
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PlusMinusSelector
            label="Number of Adults"
            value={bookingData.numAdults ?? 2}
            min={0}
            max={9}
            setValue={(value: number) => {
              setBookingData({ ...bookingData, numAdults: value });
            }}
          />
          <PlusMinusSelector
            label="Number of Children"
            value={bookingData.numChildren ?? 0}
            min={0}
            max={9}
            setValue={(value: number) => {
              setBookingData({ ...bookingData, numChildren: value });
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <StyledCheckbox
            label="Has pets?"
            checked={bookingData.pets ?? false}
            onChange={() => {
              setBookingData({ ...bookingData, pets: !bookingData.pets });
            }}
          />
          {bookingData.pets ? (
            <StyledInput
              label="Pet Description"
              value={bookingData.petDescription}
              onChange={setFormData("petDescription")}
            />
          ) : null}
        </div>
        <StyledDropdown
          label="Add addon"
          placeholder="Search for addon..."
          value=""
          options={addons
            .filter(
              (addon) =>
                !bookingData.addons?.find(
                  (_addon) => _addon.name === addon.name
                )
            )
            .map((addon) => addon.name)}
          onSelect={(value) => {
            if (!bookingData.addons?.find(({ name }) => name === value)) {
              setBookingData({
                ...bookingData,
                addons: [
                  ...(bookingData.addons ?? []),
                  { name: value, count: 0 },
                ],
              });
            }
          }}
        />
        {(bookingData.addons ?? []).map((addon, index) => (
          <div className="flex gap-4 items-center">
            <PlusMinusSelector
              label={addon.name}
              value={addon.count}
              setValue={(value) => {
                setBookingData((data) => {
                  const newAddons = [...(data.addons ?? [])];
                  const addonIndex = newAddons.findIndex(
                    (_addon) => _addon.name === addon.name
                  );
                  const newAddon = {
                    name: newAddons[addonIndex].name,
                    count: value,
                  };
                  return {
                    ...data,
                    addons: [
                      ...newAddons.slice(0, addonIndex),
                      newAddon,
                      ...newAddons.slice(addonIndex + 1),
                    ],
                  };
                });
              }}
            />
            <XMarkIcon
              className="h-6 w-6 cursor-pointer mt-5"
              onClick={() => {
                setBookingData((data) => {
                  const oldAddons = data.addons ?? [];
                  if (oldAddons.length === 0) {
                    return { ...data, addons: oldAddons };
                  }

                  return {
                    ...data,
                    addons: [
                      ...oldAddons.slice(0, index),
                      ...oldAddons.slice(index + 1),
                    ],
                  };
                });
              }}
            />
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <StyledButton
            startIcon={<CloudArrowUpIcon />}
            onClick={async () => {
              if (bookingData.id) {
                await update(bookingData).then(() => {
                  setBookingData({});
                  setBookingModalOpen(false);
                });
              } else {
                await create({
                  ...bookingData,
                  statusReceivedDate: new Date(),
                }).then(() => {
                  setBookingData({});
                  setBookingModalOpen(false);
                });
              }
            }}
            label={bookingData.id ? "Update Booking" : "Create Booking"}
          />
          {bookingData.id ? (
            <StyledButton
              startIcon={<TrashIcon />}
              onClick={() => {
                confirm({
                  onConfirm: async () => {
                    setBookingData({});
                    await destroy(bookingData.id!);
                    setBookingModalOpen(false);
                  },
                  heading: "Confirm booking deletion",
                  body: `Are you sure you want to delete booking ${bookingData.id}?`,
                });
              }}
              label="Delete Booking"
              theme="error"
              mode="outlined"
            />
          ) : null}
        </div>
      </Modal>
    </>
  );
};
