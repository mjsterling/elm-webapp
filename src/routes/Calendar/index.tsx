import { useMemo } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { DayCard } from "./DayCard";
import {
  CalendarProvider,
  CalendarView,
  useCalendarData,
} from "../../providers/CalendarProvider";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { StyledFab } from "../../components";
import { BookingModal } from "./BookingModal";
import { ViewSwitch } from "./ViewSwitch";

const CalendarWidget = () => {
  const { date, view, setBookingModalOpen } = useCalendarData();
  const MonthCalendar = () => {
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
      <div className="flex flex-col w-full h-full">
        <div className="grid grid-cols-7 w-full px-8">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div
              key={`calendarmain__dayofweek__${day}__${index}`}
              className="font-semibold text-2xl w-full text-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid w-full h-full px-8 pt-6 pb-24 grid-cols-7 grid-rows-6">
          {gridDates.map((currentDate, index) => (
            <DayCard
              key={`daycard__${currentDate.toUTCString()}`}
              currentDate={currentDate}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gray-100 relative">
      <ViewSwitch />
      <CalendarHeader />
      {view === CalendarView.Month && <MonthCalendar />}
      <BookingModal />
      <StyledFab
        onClick={() => setBookingModalOpen(true)}
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
