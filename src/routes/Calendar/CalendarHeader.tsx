import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DateManager } from "../../components/DateManager";
import {
  CalendarView,
  useCalendarData,
} from "../../providers/CalendarProvider";

export const CalendarHeader = () => {
  const { view, date, setDate } = useCalendarData();

  return (
    <>
      {view === CalendarView.Month ? (
        <div className="flex gap-4 p-4 mt-4 justify-center items-center text-gray-700 text-xl relative">
          <button onClick={() => setDate(date.backOneMonth())}>
            <ChevronLeftIcon
              title="Back one month"
              className="cursor-pointer h-6 w-6"
            />
          </button>
          <button onClick={() => setDate(new DateManager())}>
            <h3
              title="Click to return to today"
              className="w-40 text-center cursor-pointer select-none"
            >
              {date.monthAsFullString} {date.year}
            </h3>
          </button>
          <button onClick={() => setDate(date.forwardOneMonth())}>
            <ChevronRightIcon
              title="Forward one month"
              className="cursor-pointer h-6 w-6"
            />
          </button>
        </div>
      ) : null}
      {view === CalendarView.Rooms ? (
        <div className="flex gap-4 p-4 mt-4 justify-center items-center text-gray-700 text-xl relative">
          <button onClick={() => setDate(date.backOneDay())}>
            <ChevronLeftIcon
              title="Back one day"
              className="cursor-pointer h-6 w-6"
            />
          </button>
          <button onClick={() => setDate(new DateManager())}>
            <h3
              title="Click to return to today"
              className="w-40 text-center cursor-pointer select-none"
            >
              {date.date} {date.monthAsFullString} {date.year}
            </h3>
          </button>
          <button onClick={() => setDate(date.forwardOneDay())}>
            <ChevronRightIcon
              title="Forward one day"
              className="cursor-pointer h-6 w-6"
            />
          </button>{" "}
        </div>
      ) : null}
    </>
  );
};
