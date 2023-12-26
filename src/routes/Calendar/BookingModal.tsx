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
  ConfirmModalProps,
  ConfirmModal,
} from "../../components";
import { useCalendarData } from "../../providers/CalendarProvider";
import { useState } from "react";
import { BookingDateDisplay } from "./BookingDateDisplay";
import { TrashIcon } from "@heroicons/react/24/solid";
import { BookingStatusDisplay } from "./BookingStatus";

export const BookingModal = () => {
  const { bookingModalOpen, setBookingModalOpen, bookingData, setBookingData } =
    useCalendarData();
  const { create, update, destroy } = useCrud(Collection.bookings);
  const [confirmModalProps, setConfirmModalProps] =
    useState<ConfirmModalProps>();
  const [_, setConfirmModalOpen] = useState(false);
  const setFormData =
    (field: keyof Booking) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setBookingData({ ...bookingData, [field]: e.currentTarget.value });
    };

  // const rooms = useCollection(Collection.rooms);

  // const availableRoomsForDates = () =>
  //   useMemo(() => {
  //     return bookings.filter((booking) => true);
  //   }, [rooms, bookings]);

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
        <div className="grid grid-cols-2 gap-4 flex-col md:flex-row">
          <StyledCheckbox
            label="Pets?"
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

        <div className="grid grid-cols-2 gap-4 flex-col md:flex-row">
          <StyledButton
            startIcon={<CloudArrowUpIcon />}
            onClick={async () => {
              if (bookingData.id) {
                await update(bookingData).then(() => {
                  setBookingData({});
                  setBookingModalOpen(false);
                });
              } else {
                await create(bookingData).then(() => {
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
                setConfirmModalProps({
                  open: true,
                  setOpen: setConfirmModalOpen,
                  onConfirm: async () => {
                    setConfirmModalProps(undefined);
                    setBookingData({});
                    setBookingModalOpen(false);
                    await destroy(bookingData.id!);
                  },
                  onDecline: () => {
                    setConfirmModalProps(undefined);
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
      {confirmModalProps ? <ConfirmModal {...confirmModalProps} /> : null}
    </>
  );
};
