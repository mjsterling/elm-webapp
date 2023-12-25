import { DateManager } from "../../components/DateManager";

type DayCardProps = {
  date: DateManager;
  currentDate: Date;
  index: number;
  //   bookings: Array<{}>;
};

type DayCard = (props: DayCardProps) => JSX.Element;

export const DayCard: DayCard = ({ date, currentDate, index }) => {
  const calculateBorder = (): React.CSSProperties => {
    return {
      borderTopWidth: index <= 6 ? "2px" : "0",
      borderLeftWidth: index % 7 === 0 ? "2px" : "0",
      borderRightWidth: "2px",
      borderBottomWidth: "2px",
    };
  };

  return (
    <div
      className="border-2 border-gray-700 flex p-2"
      style={{
        ...calculateBorder(),
        backgroundColor:
          currentDate.getMonth() === date.month ? "white" : "#EEE",
      }}
    >
      <h3 className="text-lg">{currentDate.getDate()}</h3>
    </div>
  );
};
