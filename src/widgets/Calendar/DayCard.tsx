import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { useCalendarData } from "../../providers/CalendarProvider";

type DayCardProps = {
  currentDate: Date;
  index: number;
  //   bookings: Array<{}>;
};

type DayCard = (props: DayCardProps) => JSX.Element;

export const DayCard: DayCard = ({ currentDate, index }) => {
  const { date, openBookingModal } = useCalendarData();
  const calculateBorder = (): React.CSSProperties => {
    return {
      borderTopWidth: index <= 6 ? "2px" : "0",
      borderLeftWidth: index % 7 === 0 ? "2px" : "0",
      borderRightWidth: "2px",
      borderBottomWidth: "2px",
    };
  };

  const isCurrentMonth = currentDate.getMonth() === date.month;

  return (
    <div
      className="border-2 border-gray-700 flex p-2 group relative"
      style={{
        ...calculateBorder(),
        backgroundColor: isCurrentMonth ? "white" : "#EEE",
      }}
    >
      <svg viewBox="0 0 50 50" className="h-full w-full absolute left-0 top-0">
        <text
          x="25"
          y="26"
          fontSize={32}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={
            currentDate.getMonth() === date.month &&
            currentDate.getDate() === date.date
              ? "#DDF"
              : "#DDD"
          }
        >
          {currentDate.getDate()}
        </text>
      </svg>

      <button
        onClick={openBookingModal}
        className="absolute right-2 bottom-2 rounded-full p-2 bg-blue-700 text-white hidden group-hover:block"
      >
        <SquaresPlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
