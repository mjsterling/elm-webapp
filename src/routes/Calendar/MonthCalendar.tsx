import { useMemo } from "react";
import { useCalendarData } from "../../providers/CalendarProvider";
import { DayCard } from "./DayCard";

export const MonthCalendar = () => {
  const { date } = useCalendarData();
  const numRows = Math.ceil(
    (new Date(date.year, date.month, 1).getDay() + date.daysIn(date.month)) / 7
  );

  const monthStart = new Date(date.year, date.month, 1).getDay();

  const millisecondsOfMonthStart = new Date(date.year, date.month, 1).getTime();

  const gridDates = useMemo(
    () =>
      Array.from(new Array(numRows * 7).keys()).map(
        (n) => new Date(millisecondsOfMonthStart + (n - monthStart) * 86.4e6)
      ),
    [numRows, monthStart, millisecondsOfMonthStart]
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-7 w-full my-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div
            key={`calendarmain__dayofweek__${day}__${index}`}
            className="font-semibold text-2xl w-full text-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid w-full h-full grid-cols-7 grid-rows-6 border-2 border-gray-700 rounded overflow-hidden">
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
