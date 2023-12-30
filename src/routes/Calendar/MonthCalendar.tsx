import { useMemo } from "react";
import { useCalendarData } from "../../providers/CalendarProvider";
import { DayCard } from "./DayCard";
import { SvgChevronButton } from "../../components/SvgChevronButton";
import dayjs from "dayjs";

export const MonthCalendar = () => {
  const { date, setDate } = useCalendarData();
  const monthStart = date.startOf("month").day();
  const numRows = Math.ceil((monthStart + date.endOf("month").date()) / 7);

  const millisecondsOfMonthStart = date.startOf("month").toDate().getTime();

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
          onClick={() => setDate(date.subtract(1, "month"))}
        />

        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          onClick={() => setDate(dayjs())}
          className="cursor-pointer select-none"
          x={355}
          y={-75}
          fontSize={26}
          fontWeight={500}
        >
          {date.format("MMM YY")}
        </text>
        <SvgChevronButton
          size={20}
          x={480}
          y={-82}
          direction="right"
          onClick={() => setDate(date.add(1, "month"))}
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
