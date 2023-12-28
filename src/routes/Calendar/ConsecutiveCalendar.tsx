import { DateManager } from "../../components";
import { SvgChevronButton } from "../../components/SvgChevronButton";
import { useCollection } from "../../hooks";
import { Collection } from "../../models/collection";
import { useCalendarData } from "../../providers/CalendarProvider";

export const ConsecutiveCalendar = () => {
  const { bookings, date, setDate } = useCalendarData();
  const rooms = useCollection(Collection.rooms);
  const dates = Array.from(new Array(9).keys()).map((n) => n + date.asDays - 4);
  return (
    <div className="w-full h-full py-8">
      <svg viewBox="-100 -100 1100 1300" fontSize={24}>
        {/* Headers */}

        <SvgChevronButton
          direction="left"
          x={-50}
          y={-65}
          size={25}
          onClick={() => setDate(date.backOneDay())}
        />
        {dates.map((date, i) => {
          return (
            <>
              <text
                onClick={() => setDate(new DateManager().fromDays(date))}
                className="cursor-pointer"
                fontWeight={i === 4 ? 700 : 500}
                x={50 + 100 * i}
                y={-50}
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {new Date(date * 86.4e6).toLocaleDateString("en-AU", {
                  year: undefined,
                  month: "short",
                  day: "numeric",
                })}
              </text>
            </>
          );
        })}
        <SvgChevronButton
          direction="right"
          x={950}
          y={-65}
          size={25}
          onClick={() => setDate(date.forwardOneDay())}
        />

        {/* End Headers */}

        {rooms.map((room, i) => (
          <text
            x={-50}
            y={50 + i * 100}
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            Room {room.roomNumber}
          </text>
        ))}
      </svg>
    </div>
  );
};
