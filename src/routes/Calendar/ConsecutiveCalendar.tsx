import { useMemo } from "react";
import { DateManager } from "../../components";
import { SvgChevronButton } from "../../components/SvgChevronButton";
import { useCollection } from "../../hooks";
import { Collection } from "../../models/collection";
import { useCalendarData } from "../../providers/CalendarProvider";

export const ConsecutiveCalendar = () => {
  const { bookings, date, setDate } = useCalendarData();
  const rooms = useCollection(Collection.rooms);
  const numDays = 7; // must be odd, don't fuck around
  const midpoint = Math.floor(numDays / 2);
  const dates = Array.from(new Array(numDays).keys()).map(
    (n) => n + date.asDays - midpoint
  );
  const bookingsForDateRange = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.startDateAsDays >= date.asDays ||
          booking.endDateAsDays <= date.asDays
      ),
    [bookings, date]
  );
  console.log(bookingsForDateRange);
  return (
    <div className="w-full h-full max-h-full max-w-full py-8">
      {bookingsForDateRange.map((booking) => (
        <rect
          x={(booking.startDateAsDays - date.asDays) * 100}
          y={35 + booking.room * 70}
          height={50}
          width={(booking.endDateAsDays - booking.startDateAsDays) * 100}
        />
      ))}
      <svg viewBox={`-100 -85 ${numDays * 100 + 200} 1090`} fontSize={24}>
        {/* Headers */}

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
                onClick={() => setDate(new DateManager().fromDays(date))}
                className="cursor-pointer"
                fontWeight={i === midpoint ? 700 : 500}
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

        {/* End Headers */}

        {rooms
          .sort((a, b) => a.roomNumber - b.roomNumber)
          .map((room, i) => (
            <text
              x={-50}
              y={42 + i * 80}
              alignmentBaseline="middle"
              textAnchor="middle"
              fontWeight={700}
            >
              {room.roomNumber}
            </text>
          ))}

        {Array.from(new Array(rooms.length * numDays).keys()).map((index) => (
          <rect
            x={100 * (index % numDays)}
            y={80 * Math.floor(index / numDays)}
            width={100}
            height={80}
            stroke="#333"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};
