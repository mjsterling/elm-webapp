import { CalendarHeader } from "./CalendarHeader";
import {
  CalendarProvider,
  CalendarView,
  useCalendarData,
} from "../../providers/CalendarProvider";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { StyledFab } from "../../components";
import { BookingModal } from "./BookingModal";
import { ConsecutiveCalendar } from "./ConsecutiveCalendar";
import { MonthCalendar } from "./MonthCalendar";
import { RoomCalendar } from "./RoomCalendar";

const CalendarWidget = () => {
  const { view, setBookingModalOpen } = useCalendarData();

  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gray-100 relative p-8">

      <CalendarHeader />
      <div className="w-full h-full">
        {view === CalendarView.Month ? <MonthCalendar /> : null}
        {view === CalendarView.Consecutive ? <ConsecutiveCalendar /> : null}
        {view === CalendarView.Rooms ? <RoomCalendar /> : null}
      </div>
      <BookingModal />
      <StyledFab
        onClick={() => setBookingModalOpen(true)}
        icon={<SquaresPlusIcon />}
        label="Add New Booking"
        className="absolute right-4 bottom-4"
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
