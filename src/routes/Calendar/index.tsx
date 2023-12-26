import { useMemo, useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { DayCard } from "./DayCard";
import {
  CalendarProvider,
  useCalendarData,
} from "../../providers/CalendarProvider";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { StyledFab } from "../../components/StyledFAB";
import { BookingModal } from "./BookingModal";

const CalendarWidget = () => {
  const { date } = useCalendarData();
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const CalendarBody = () => {
    const numRows = Math.ceil(
      (new Date(date.year, date.month, 1).getDay() + date.daysIn(date.month)) /
        7
    );

    const monthStart = new Date(date.year, date.month, 1).getDay();

    const millisecondsOfMonthStart = new Date(
      date.year,
      date.month,
      1
    ).getTime();

    const gridDates = useMemo(
      () =>
        Array.from(new Array(numRows * 7).keys()).map(
          (n) => new Date(millisecondsOfMonthStart + (n - monthStart) * 86.4e6)
        ),
      [numRows, monthStart, millisecondsOfMonthStart]
    );

    return (
      <div className="grid w-full h-full px-8 pt-6 pb-24 grid-cols-7 grid-rows-6">
        {gridDates.map((currentDate, index) => (
          <DayCard
            key={`daycard__${currentDate.toUTCString()}`}
            currentDate={currentDate}
            index={index}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gray-100">
      <CalendarHeader />
      <CalendarBody />
      <BookingModal
        open={newBookingModalOpen}
        setOpen={setNewBookingModalOpen}
      />
      <StyledFab
        onClick={() => setNewBookingModalOpen(true)}
        icon={<SquaresPlusIcon />}
        label="Add New Booking"
        className="absolute right-8 bottom-8"
      />
    </div>
  );
};

const Calendar = () => (
  <CalendarProvider>
    <CalendarWidget />
  </CalendarProvider>
);

export default Calendar;
