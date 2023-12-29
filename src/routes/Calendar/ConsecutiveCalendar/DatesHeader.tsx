import { setDate } from "date-fns";
import { DateManager } from "../../../components";
import { SvgChevronButton } from "../../../components/SvgChevronButton";
import { useCalendarData } from "../../../providers/CalendarProvider";

export const DatesHeader = ({
  dates,
  numDays,
}: {
  dates: number[];
  numDays: number;
}) => {
  const { date, setDate } = useCalendarData();
  const viewMidpoint = date.asDays;

  return (
    <>
      <SvgChevronButton
        direction="left"
        x={-50}
        y={-58}
        size={20}
        onClick={() => setDate(date.backOneDay())}
      />
      {dates.map((date, i) => {
        return (
          <>
            <text
              onClick={() =>
                setDate(new DateManager().fromDays(date + 11 / 24))
              }
              className="cursor-pointer"
              fontWeight={date === viewMidpoint ? 700 : 500}
              x={50 + 100 * i}
              y={-50}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {new Date(date * 86.4e6).toLocaleDateString("en-AU", {
                // year: undefined,
                month: "short",
                day: "numeric",
              })}
            </text>
          </>
        );
      })}
      <SvgChevronButton
        direction="right"
        x={50 + numDays * 100}
        y={-58}
        size={20}
        onClick={() => setDate(date.forwardOneDay())}
      />
    </>
  );
};
