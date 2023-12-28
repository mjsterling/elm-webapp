import { useMemo } from "react";
import { useCalendarData } from "../../providers/CalendarProvider";
import { DayCard } from "./DayCard";
import { DateManager } from "../../components";
import { SvgChevronButton } from "../../components/SvgChevronButton";

export const MonthCalendar = () => {
  const { date, setDate } = useCalendarData();
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
      <svg
        viewBox="-5 -100 710 700"
        className="h-full w-full min-h-full min-w-full"
      >
        <SvgChevronButton
          size={20}
          x={230}
          y={-82}
          direction="left"
          onClick={() => setDate(date.backOneMonth())}
        />

        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          onClick={() => setDate(new DateManager())}
          className="cursor-pointer select-none"
          x={355}
          y={-75}
          fontSize={26}
          fontWeight={500}
        >
          {date.monthAsFullString} {date.year}
        </text>
        <SvgChevronButton
          size={20}
          x={480}
          y={-82}
          direction="right"
          onClick={() => setDate(date.forwardOneMonth())}
        />
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <text
            x={i * 100 + 50}
            y={-20}
            fontSize={24}
            fontWeight={500}
            alignmentBaseline="middle"
            textAnchor="middle"
            key={`calendarmain__dayofweek__${day}__${i}`}
          >
            {day}
          </text>
        ))}
        {gridDates.map((currentDate, index) => (
          <DayCard
            key={`daycard__${currentDate.toUTCString()}`}
            currentDate={currentDate}
            index={index}
          />
        ))}
      </svg>
    </div>
  );
};
