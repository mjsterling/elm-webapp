import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  CalendarView,
  useCalendarData,
} from "../../providers/CalendarProvider";
import { ViewSwitch } from "./ViewSwitch";
import dayjs from "dayjs";

export const CalendarHeader = () => {
  const { view, date, setDate } = useCalendarData();

  return (
    <>
      {view === CalendarView.Rooms ? (
        <div className="flex gap-4 mt-2 justify-center items-center text-gray-700 text-xl relative">
          <button onClick={() => setDate(date.subtract(1, "day"))}>
            <ChevronLeftIcon
              title="Back one day"
              className="cursor-pointer h-6 w-6"
            />
          </button>
          <button onClick={() => setDate(dayjs())}>
            <h3
              title="Click to return to today"
              className="w-40 text-center cursor-pointer select-none"
            >
              {date.format("DD MMM YY")}
            </h3>
          </button>
          <button onClick={() => setDate(date.add(1, "day"))}>
            <ChevronRightIcon
              title="Forward one day"
              className="cursor-pointer h-6 w-6"
            />
          </button>{" "}
        </div>
      ) : null}
      <ViewSwitch />
    </>
  );
};
