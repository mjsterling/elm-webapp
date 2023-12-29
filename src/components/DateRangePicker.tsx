import { useState } from "react";
import { DateManager } from "./DateManager";
import clsx from "clsx";
import { IconButton } from "./IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { daysSinceEpoch } from "../utils/dateUtils";

type DateRangePickerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setDates: ({
    startDate,
    endDate,
  }: {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
  }) => void;
};

type DateRangePicker = React.FC<DateRangePickerProps>;
export const DateRangePicker: DateRangePicker = ({
  startDate,
  endDate,
  setDates,
}) => {
  const dayOfStartDate = daysSinceEpoch(startDate);
  const dayOfEndDate = daysSinceEpoch(endDate);
  const DayCard = ({ currentDate }: { currentDate: Date }) => {
    const dayOfCurrentDate = Math.floor(currentDate.getTime() / 86.4e6);
    const isStartDate = dayOfStartDate === dayOfCurrentDate;
    const isEndDate = dayOfEndDate === dayOfCurrentDate;
    const isBetweenDate =
      dayOfCurrentDate > dayOfStartDate && dayOfCurrentDate < dayOfEndDate;

    const handleDateChange = () => {
      if (isEndDate) {
        setDates({ startDate: currentDate, endDate: undefined });
      } else if (startDate === undefined || dayOfCurrentDate < dayOfStartDate) {
        setDates({ startDate: currentDate });
      } else if (isStartDate) {
        setDates({ startDate: undefined, endDate: undefined });
      } else if (startDate && dayOfCurrentDate > dayOfStartDate) {
        setDates({ endDate: currentDate });
      }
    };

    return (
      <div
        className={clsx(
          "group flex justify-center items-center relative cursor-pointer select-none",
          currentDate.getMonth() === date.month ? "bg-white" : "bg-gray-50"
        )}
        onClick={handleDateChange}
      >
        <svg
          viewBox="0 0 50 50"
          className="h-full w-full absolute left-0 top-0"
        >
          {isStartDate || isBetweenDate ? (
            <path d="M 100,5 h -75 a 20,20 0 0,0 0,40 h 75 Z" fill="#DDF" />
          ) : null}
          {isEndDate || isBetweenDate ? (
            <path d="M -100,5 h 125 a 20,20 0 0,1 0,40 h -125 Z" fill="#DDF" />
          ) : null}
          <circle
            cx={25}
            cy={25}
            r={20}
            fill="#1d4ed8"
            className={clsx(
              "group-hover:opacity-100 transition-opacity",
              isStartDate || isEndDate ? "opacity-100" : "opacity-0"
            )}
          />

          <text
            x="25"
            y="26"
            fontSize={16}
            fontWeight="500"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill={
              currentDate.getMonth() === date.month &&
              currentDate.getDate() === date.date
                ? "#00F"
                : "#000"
            }
            className="select-none"
          >
            {currentDate.getDate()}
          </text>
          <text
            x="25"
            y="26"
            fontSize={16}
            fontWeight="500"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#FFF"
            // stroke="#FFF"
            // strokeWidth="1"
            className={clsx(
              "group-hover:opacity-100 select-none",
              isStartDate || isEndDate ? "opacity-100" : "opacity-0"
            )}
          >
            {currentDate.getDate()}
          </text>
        </svg>
      </div>
    );
  };
  const [date, setDate] = useState<DateManager>(new DateManager());
  const numRows = Math.ceil(
    (new Date(date.year, date.month, 1).getDay() + date.daysIn(date.month)) / 7
  );

  const monthStart = new Date(date.year, date.month, 1, 16).getDay();

  const millisecondsOfMonthStart = new Date(
    date.year,
    date.month,
    1,
    16
  ).getTime();

  const gridDates = Array.from(new Array(numRows * 7).keys()).map(
    (n) => new Date(millisecondsOfMonthStart + (n - monthStart) * 86.4e6)
  );

  return (
    <div className="flex flex-col gap-1 justify-center">
      <div
        className="grid w-[350px] h-[370px] grid-cols-7 border border-blue-700 rounded overflow-hidden"
        style={{ gridTemplateRows: "50px 30px repeat(6,1fr)" }}
      >
        <div className="col-span-7 flex justify-center items-center gap-2">
          <IconButton
            className="bg-transparent"
            icon={<ChevronLeftIcon />}
            onClick={() => {
              setDate(date.backOneMonth());
            }}
          />
          <h5
            className="font-semibold w-32 text-center cursor-pointer"
            onClick={() => setDate(new DateManager())}
          >
            {date.monthAsFullString} {date.year}
          </h5>
          <IconButton
            className="bg-transparent"
            icon={<ChevronRightIcon />}
            onClick={() => {
              setDate(date.forwardOneMonth());
            }}
          />
        </div>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div
            className="flex justify-center items-center font-bold"
            key={`dayofweek__${index}__${day}`}
          >
            {day}
          </div>
        ))}
        {gridDates.map((currentDate) => (
          <DayCard
            key={`datepicker__daycard__${currentDate.toUTCString()}`}
            currentDate={currentDate}
          />
        ))}
      </div>
    </div>
  );
};
