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
  const calculateBorder = (): React.CSSProperties => {
    return {
      borderTopWidth: index <= 6 ? "2px" : "0",
      borderLeftWidth: index % 7 === 0 ? "2px" : "0",
      borderRightWidth: "2px",
      borderBottomWidth: "2px",
    };
  };

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

  return (
    <div
      className="border-gray-700 flex"
      style={{
        ...calculateBorder(),
        backgroundColor: isCurrentDate
          ? "#E7F7FF"
          : isCurrentMonth
          ? "white"
          : "#f3f3f3",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full left-0 top-0"
        style={index % 7 === 0 ? { marginTop: "-1px" } : {}}
      >
        {todaysBookings.length
          ? todaysBookings.map((booking) => (
              <BookingLine booking={booking} currentDate={currentDate} />
            ))
          : null}
        <text
          className="select-none"
          x="50"
          y="50"
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
        </text>
      </svg>

      {/* <button
        onClick={() => {
          setBookingModalOpen(true);
          setBookingData({ ...bookingData, startDate: currentDate });
        }}
        className="absolute right-1 bottom-1 rounded-full p-1 bg-blue-400 text-white  hidden sm:block"
      >
        <SquaresPlusIcon className="h-4 w-4" />
      </button> */}
    </div>
  );
};
