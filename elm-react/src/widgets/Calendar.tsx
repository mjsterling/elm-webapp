import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { DateManager } from "../components/DateManager";

export const Calendar = () => {
  const [view, setView] = useState<"month" | "consecutive">("month");
  const [date, setDate] = useState(new DateManager());
  const CalendarHeader = () => {
    if (view === "month") {
      return (
        <div className="flex gap-4 p-4 justify-center items-center text-gray-700 text-xl">
          <ChevronLeftIcon
            className="cursor-pointer h-6 w-6"
            onClick={() => setDate(date.backOneMonth())}
          />
          <h3
            className="w-40 text-center cursor-pointer select-none"
            onClick={() => setDate(new DateManager())}
          >
            {date.monthAsFullString} {date.year}
          </h3>
          <ChevronRightIcon
            className="cursor-pointer h-6 w-6"
            onClick={() => setDate(date.forwardOneMonth())}
          />
        </div>
      );
    } else {
      return null;
    }
  };
  const CalendarBody = () => {
    type DayCard = ({
      day,
      currentDate,
    }: //   bookings,
    {
      day: number;
      currentDate: number;
      //   bookings: Array<{}>;
    }) => JSX.Element;
    const Day: DayCard = ({ day, currentDate }) => {
      const numRows = Math.ceil(
        (new Date(date.asDate.setDate(0)).getDay() + date.daysIn(date.month)) /
          7
      );
      console.log("numrows", numRows);

      return (
        <div
          className="border-2 border-gray-700 flex p-2"
          style={{ gridColumn: day + 1, ...calculateBorder() }}
        >
          <h3 className="text-lg">{currentDate + 1}</h3>
        </div>
      );
    };
    const Days = () => (
      <>
        {Array.from(new Array(date.daysIn(date.month)).keys()).map(
          (currentDate) => (
            <Day
              currentDate={currentDate}
              day={new Date(date.year, date.month, currentDate).getDay()}
            />
          )
        )}
      </>
    );
    return (
      <div className="grid w-full h-full px-8 py-24 grid-cols-7 grid-rows-6">
        <Days />
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
};
