import type { DocumentData } from "firebase/firestore";
import { useCalendarData } from "../../providers/CalendarProvider";
import { daysSinceEpoch } from "../../utils/dateUtils";
import clsx from "clsx";
import { statusColors } from "../../utils/statusColors";
import { BookingStatus } from "../../models/bookingStatus";

type BookingLineProps = {
  booking: DocumentData;
  currentDate: Date;
  cellIndex: number;
};

type BookingLine = React.FC<BookingLineProps>;
export const BookingLine: BookingLine = ({
  booking,
  currentDate,
  cellIndex,
}) => {
  const {
    hoveredBooking,
    setHoveredBooking,
    setBookingData,
    setBookingModalOpen,
  } = useCalendarData();
  const currentDateAsDays = daysSinceEpoch(currentDate);
  const cellPosX = (cellIndex % 7) * 100;
  const cellPosY = Math.floor(cellIndex / 7) * 100;

  const startDateAsDays = daysSinceEpoch(booking.startDate);
  const endDateAsDays = daysSinceEpoch(booking.endDate);
  const isStartDate = startDateAsDays === currentDateAsDays;
  const isEndDate = endDateAsDays === currentDateAsDays;
  const isBetweenDate =
    currentDateAsDays > startDateAsDays && currentDateAsDays < endDateAsDays;

  return (booking.rooms ?? []).map((roomNumber: number) => {
    const lineColor =
      hoveredBooking === booking.id
        ? "black"
        : statusColors[booking.status as BookingStatus];
    const lineYStart = cellPosY + 2 + Math.round((roomNumber - 1) * 8);
    return (
      <g
        className={clsx("cursor-pointer opacity-70")}
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
              d={`M ${
                cellPosX + 100
              },${lineYStart} h -19.7 a 6,6 0 1 0 0,6 h 19.7 Z`}
              fill={lineColor}
            />
            <circle
              cx={cellPosX + 75}
              cy={lineYStart + 3}
              r={4}
              fill="white"
              stroke="none"
            />
            <text
              alignmentBaseline="middle"
              className="select-none"
              textAnchor="middle"
              x={cellPosX + 75}
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
          <path
            d={`M${cellPosX},${lineYStart} h 100 v 6 h -100 Z`}
            fill={lineColor}
          />
        ) : null}
        {isEndDate ? (
          <path
            d={`M ${cellPosX},${lineYStart} h 25 a 3,3 0 0 1 0,6 h -25 Z`}
            fill={lineColor}
          />
        ) : null}
      </g>
    );
  });
};

export const lineColors = [
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
