import { useCalendarData } from "../../providers/CalendarProvider";

type DayCardProps = {
  currentDate: Date;
  index: number;
  //   bookings: Array<{}>;
};

type DayCard = (props: DayCardProps) => JSX.Element;

export const DayCard: DayCard = ({ currentDate, index }) => {
  const { date, bookings, setBookingModalOpen, bookingData, setBookingData } =
    useCalendarData();
  const calculateBorder = (): React.CSSProperties => {
    return {
      borderTopWidth: index <= 6 ? "2px" : "0",
      borderLeftWidth: index % 7 === 0 ? "2px" : "0",
      borderRightWidth: "2px",
      borderBottomWidth: "2px",
    };
  };

  const isCurrentMonth = currentDate.getMonth() === date.month;
  const isCurrentDate =
    Math.floor(currentDate.getTime() / 86.4e6) ===
    Math.floor(new Date().getTime() / 86.4e6);

  return (
    <div
      className="border-2 border-gray-700 flex p-2 group relative"
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
        viewBox="0 0 200 200"
        className="h-full w-full absolute left-0 top-0"
      >
        <text
          className="select-none"
          x="100"
          y="110"
          fontSize={120}
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
