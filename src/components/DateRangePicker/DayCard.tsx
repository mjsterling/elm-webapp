import dayjs, { Dayjs } from "dayjs";
import { useDatePicker } from "./DateRangePickerProvider";
import clsx from "clsx";

export const DayCard = ({ currentDate }: { currentDate: Dayjs }) => {
  const { startDate, endDate, setDates, viewDate } = useDatePicker();
  const startDateObject = dayjs(startDate);
  const currentDateObject = dayjs(currentDate);
  const endDateObject = dayjs(endDate);
  const isStartDate = currentDateObject.isSame(startDateObject, "day");
  const isEndDate = currentDateObject.isSame(endDateObject, "day");
  const isBetweenDate =
    currentDateObject.isAfter(startDateObject, "day") &&
    currentDateObject.isBefore(endDateObject, "day");

  const handleDateChange = () => {
    if (isEndDate) {
      setDates({ startDate: currentDate.toDate(), endDate: undefined });
    } else if (
      startDate === undefined ||
      currentDateObject.isBefore(startDateObject, "day")
    ) {
      setDates({ startDate: currentDate.toDate() });
    } else if (isStartDate) {
      setDates({ startDate: undefined, endDate: undefined });
    } else if (startDate && currentDateObject.isAfter(startDateObject, "day")) {
      setDates({ endDate: currentDate.toDate() });
    }
  };

  return (
    <div
      className={clsx(
        "group flex justify-center items-center relative cursor-pointer select-none",
        currentDate.isSame(viewDate, "month") ? "bg-white" : "bg-gray-50"
      )}
      onClick={handleDateChange}
    >
      <svg viewBox="0 0 50 50" className="h-full w-full absolute left-0 top-0">
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
          fill={currentDate.isSame(viewDate, "day") ? "#00F" : "#000"}
          className="select-none"
        >
          {currentDate.date()}
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
          {currentDate.date()}
        </text>
      </svg>
    </div>
  );
};
