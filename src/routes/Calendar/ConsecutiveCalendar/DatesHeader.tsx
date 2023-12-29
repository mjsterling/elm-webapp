import { Dayjs } from "dayjs";
import { SvgChevronButton } from "../../../components/SvgChevronButton";
import { useCalendarData } from "../../../providers/CalendarProvider";

export const DatesHeader = ({
  dates,
  numDays,
}: {
  dates: Dayjs[];
  numDays: number;
}) => {
  const { date, setDate } = useCalendarData();

  return (
    <>
      <SvgChevronButton
        direction="left"
        x={-50}
        y={-58}
        size={20}
        onClick={() => setDate(date.subtract(1, "day"))}
      />
      {dates.map((_date, i) => {
        return (
          <>
            <text
              onClick={() => setDate(_date)}
              className="cursor-pointer"
              fontWeight={date.isSame(_date, "day") ? 700 : 500}
              x={50 + 100 * i}
              y={-50}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {date.format("MMM YY")}
            </text>
          </>
        );
      })}
      <SvgChevronButton
        direction="right"
        x={50 + numDays * 100}
        y={-58}
        size={20}
        onClick={() => setDate(date.add(1, "day"))}
      />
    </>
  );
};
