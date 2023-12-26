import { useState } from "react";
import { Modal } from "../../components/Modal";
import { CloudArrowUpIcon } from "@heroicons/react/16/solid";
import { StyledSubmit } from "../../components/StyledSubmit";
import { Collection } from "../../models/collection";
import { useCrud } from "../../hooks/useCrud";
import { StyledCheckbox } from "../../components/StyledCheckbox";
import { StyledInput } from "../../components/StyledInput";
import { PlusMinusSelector } from "../../components/PlusMinusSelector";
import { DateRangePicker } from "../../components/DateRangePicker";

type BookingModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editId?: string;
};

type BookingModal = React.FC<BookingModalProps>;

export const BookingModal: BookingModal = ({ open, setOpen, editId }) => {
  const { create, update, destroy } = useCrud(Collection.bookings);
  const [data, setData] = useState<Partial<Booking>>({});
  const setFormData =
    (field: keyof Booking) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [field]: e.currentTarget.value });
    };
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      onClose={() => setData({})}
      title={data.id ? "Edit Booking #" + data.id : "New Booking"}
      className="flex flex-col gap-3"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StyledInput
          value={data.startDate?.toLocaleDateString("en-AU")}
          label="Start Date"
          disabled
        />
        <StyledInput
          value={data.endDate?.toLocaleDateString("en-AU")}
          label="End Date"
          disabled
        />
      </div>
      <div className="flex w-full justify-center items-center">
        <DateRangePicker
          startDate={data.startDate}
          endDate={data.endDate}
          setDates={(dates) => {
            setData({ ...data, ...dates });
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StyledInput
          label="First Name"
          value={data.contactFirstName}
          onChange={setFormData("contactFirstName")}
        />
        <StyledInput
          label="Last Name"
          value={data.contactLastName}
          onChange={setFormData("contactLastName")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StyledInput
          label="Contact Email Address"
          value={data.contactEmail}
          onChange={setFormData("contactEmail")}
        />
        <StyledInput
          label="Contact Phone Number"
          value={data.contactPhone}
          onChange={setFormData("contactPhone")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PlusMinusSelector
          label="Number of Adults"
          value={data.numAdults ?? 2}
          min={0}
          max={9}
          setValue={(value: number) => {
            setData({ ...data, numAdults: value });
          }}
        />
        <PlusMinusSelector
          label="Number of Children"
          value={data.numChildren ?? 0}
          min={0}
          max={9}
          setValue={(value: number) => {
            setData({ ...data, numChildren: value });
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 flex-col md:flex-row">
        <StyledCheckbox
          label="Pets?"
          checked={data.pets ?? false}
          onChange={() => {
            setData({ ...data, pets: !data.pets });
          }}
        />
        {data.pets ? (
          <StyledInput
            label="Pet Description"
            value={data.petDescription}
            onChange={setFormData("petDescription")}
          />
        ) : null}
      </div>

      {/* <StyledInput
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
      /> */}
      <StyledCheckbox
        label="Booking confirmed?"
        checked={data.confirmed ?? false}
        onChange={() => {
          setData({ ...data, confirmed: !data.confirmed });
        }}
      />
      <StyledSubmit
        icon={<CloudArrowUpIcon />}
        onClick={async () => {
          if (editId) {
            await update(editId, { ...data }).then(() => {
              setData({});
              setOpen(false);
            });
          } else {
          }
          await create(data).then(() => {
            setData({});
            setOpen(false);
          });
        }}
        label={editId ? "Update Booking" : "Create Booking"}
      />
    </Modal>
  );
};
