import type { DocumentData } from "firebase/firestore";
import { useCalendarData } from "../../providers/CalendarProvider";
import { daysSinceEpoch } from "../../utils/dateUtils";
import clsx from "clsx";

type BookingLineProps = {
  booking: DocumentData;
  currentDate: Date;
};

type BookingLine = React.FC<BookingLineProps>;
export const BookingLine: BookingLine = ({ booking, currentDate }) => {
  const {
    hoveredBooking,
    setHoveredBooking,
    setBookingData,
    setBookingModalOpen,
  } = useCalendarData();
  const currentDateAsDays = daysSinceEpoch(currentDate);

  const roomNumber = booking.room?.roomNumber ?? 0;
  const lineColor =
    hoveredBooking === booking.id
      ? "black"
      : roomNumber === 0
      ? "#555"
      : lineColors[roomNumber - 1];
  const startDateAsDays = daysSinceEpoch(booking.startDate);
  const endDateAsDays = daysSinceEpoch(booking.endDate);
  const isStartDate = startDateAsDays === currentDateAsDays;
  const isEndDate = endDateAsDays === currentDateAsDays;
  const isBetweenDate =
    currentDateAsDays > startDateAsDays && currentDateAsDays < endDateAsDays;
  const lineYStart = 2 + Math.round((roomNumber - 1) * 8);
  return (
    <g
      className={clsx("cursor-pointer")}
      onMouseOver={() => setHoveredBooking(booking.id)}
      onMouseOut={() => setHoveredBooking("")}
      onClick={() => {
        setBookingData({ ...booking });
        setBookingModalOpen(true);
        setHoveredBooking("");
      }}
    >
      {isStartDate ? (
        <>
          <path
            d={`M 200,${lineYStart} h -119.7 a 6,6 0 1 0 0,6 h 119.7 Z`}
            fill={lineColor}
          />
          <circle
            cx={75}
            cy={lineYStart + 3}
            r={4}
            fill="white"
            stroke="none"
          />
          <text
            alignmentBaseline="middle"
            className="select-none"
            textAnchor="middle"
            x={75}
            y={lineYStart + 3.7}
            fontSize={6}
            fontWeight={700}
            fill={lineColor}
          >
            {roomNumber === 0 ? "??" : roomNumber}
          </text>
        </>
      ) : null}
      {isBetweenDate ? (
        <path d={`M-100,${lineYStart} h 300 v 6 h -300 Z`} fill={lineColor} />
      ) : null}
      {isEndDate ? (
        <path
          d={`M -100,${lineYStart} h 125 a 3,3 0 0 1 0,6 h -125 Z`}
          fill={lineColor}
        />
      ) : null}
    </g>
  );
};

const lineColors = [
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#80ff00",
  "#00ff00",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
  "#ff0080",
];
