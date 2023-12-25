import { useMemo, useState } from "react";
import { DateManager } from "../../components/DateManager";
import { CalendarHeader } from "./CalendarHeader";
import { DayCard } from "./DayCard";

export const Calendar = () => {
  const [view, setView] = useState<"month" | "consecutive">("month");
  const [date, setDate] = useState(new DateManager());

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
      <div className="grid w-full h-full px-8 py-24 grid-cols-7 grid-rows-6">
        {gridDates.map((currentDate, index) => (
          <DayCard
            key={`daycard__${currentDate.toUTCString()}`}
            date={date}
            currentDate={currentDate}
            index={index}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <CalendarHeader
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
      />
      <CalendarBody />
    </div>
  );
};
