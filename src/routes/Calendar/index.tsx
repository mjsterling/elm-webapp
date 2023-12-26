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
import { MonthCalendar } from "./MonthCalendar";
import { RoomView } from "./RoomView";

const CalendarWidget = () => {
  const { view, setBookingModalOpen } = useCalendarData();

  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gray-100 relative p-8 pb-24">
      <div className="flex w-full justify-center">
        <h1>
          Dashboard -{" "}
          {view === CalendarView.Month
            ? "Month View"
            : view === CalendarView.Consecutive
            ? "Consecutive View"
            : "Room View"}
        </h1>
      </div>
      <ViewSwitch />
      <CalendarHeader />
      {view === CalendarView.Month && <MonthCalendar />}
      {view === CalendarView.Rooms && <RoomView />}
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
