import { useMemo } from "react";
import { useCalendarData } from "../../providers/CalendarProvider";
import { daysSinceEpoch } from "../../utils/dateUtils";
import { BookingLine } from "./BookingLine";

type DayCardProps = {
  currentDate: Date;
  index: number;
  //   bookings: Array<{}>;
};

type DayCard = (props: DayCardProps) => JSX.Element;

export const DayCard: DayCard = ({ currentDate, index }) => {
  const { date, bookings } = useCalendarData();
  // const calculateBorder = (): React.CSSProperties => {
  //   return {
  //     borderTopWidth: index <= 6 ? "2px" : "0",
  //     borderLeftWidth: index % 7 === 0 ? "2px" : "0",
  //     borderRightWidth: "2px",
  //     borderBottomWidth: "2px",
  //   };
  // };

  const currentDateAsDays = daysSinceEpoch(currentDate);

  const todaysBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          currentDateAsDays >= daysSinceEpoch(booking.startDate) &&
          currentDateAsDays <= daysSinceEpoch(booking.endDate)
      ),
    [bookings]
  );

  const isCurrentMonth = currentDate.getMonth() === date.month;
  const isCurrentDate = currentDateAsDays === daysSinceEpoch(new Date());

  const cellPosX = (index % 7) * 100;
  const cellPosY = Math.floor(index / 7) * 100;
  return (
    <>
      <rect
        fill={isCurrentDate ? "#E7F7FF" : isCurrentMonth ? "white" : "#f3f3f3"}
        stroke="rgb(55 65 81)"
        strokeWidth={2}
        x={cellPosX}
        y={cellPosY}
        width="100"
        height="100"
        // className="h-full w-full left-0 top-0"
        // style={index % 7 === 0 ? { marginTop: "-1px" } : {}}
      />
      <text
        className="select-none"
        x={cellPosX + 50}
        y={cellPosY + 50}
        fontSize={50}
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={
          // currentDate.getMonth() === date.month &&
          // currentDate.getDate() === date.date
          //   ? "#DDF"
          // :
          "#d7d7d7"
        }
      >
        {currentDate.getDate()}
      </text>{" "}
      {todaysBookings.length
        ? todaysBookings.map((booking) => (
            <BookingLine
              cellIndex={index}
              booking={booking}
              currentDate={currentDate}
            />
          ))
        : null}
    </>
  );
};
