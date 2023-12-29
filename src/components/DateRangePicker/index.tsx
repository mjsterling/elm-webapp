import { IconButton } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import {
  DateRangePickerProvider,
  useDatePicker,
} from "./DateRangePickerProvider";
import { DayCard } from "./DayCard";

const DatePicker = () => {
  const { viewDate, setViewDate } = useDatePicker();
  const numRows = Math.ceil(
    (viewDate.startOf("month").day() + viewDate.endOf("month").date()) / 7
  );

  const monthStart = viewDate.startOf("month").day();

  const gridDates = Array.from(new Array(numRows * 7).keys()).map((n) =>
    viewDate.add(n - monthStart, "day")
  );

  console.log(gridDates);

  return (
    <div className="flex flex-col gap-1 justify-center">
      <div
        className="grid w-[320px] h-[350px] grid-cols-7 border border-blue-700 rounded overflow-hidden"
        style={{ gridTemplateRows: "50px 30px repeat(6,1fr)" }}
      >
        <div className="col-span-7 flex justify-center items-center gap-2">
          <IconButton
            className="bg-transparent"
            icon={<ChevronLeftIcon />}
            onClick={() => {
              setViewDate(viewDate.add(1, "month"));
            }}
          />
          <h5
            className="font-semibold w-32 text-center cursor-pointer"
            onClick={() => {
              setViewDate(dayjs());
            }}
          >
            {viewDate.format("MMM YY")}
          </h5>
          <IconButton
            className="bg-transparent"
            icon={<ChevronRightIcon />}
            onClick={() => {
              setViewDate(viewDate.add(1, "month"));
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
            key={`datepicker__daycard__${currentDate.toISOString()}`}
            currentDate={currentDate}
          />
        ))}
      </div>
    </div>
  );
};

export const DateRangePicker = () => (
  <DateRangePickerProvider>
    <DatePicker />
  </DateRangePickerProvider>
);
