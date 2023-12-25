import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DateManager } from "../../components/DateManager";

type CalendarHeaderProps = {
  view: "month" | "consecutive";
  setView: React.Dispatch<React.SetStateAction<"month" | "consecutive">>;
  date: DateManager;
  setDate: React.Dispatch<React.SetStateAction<DateManager>>;
};

type CalendarHeader = (props: CalendarHeaderProps) => JSX.Element;

export const CalendarHeader: CalendarHeader = ({
  view,
  //   setView,
  date,
  setDate,
}: {
  view: "month" | "consecutive";
  setView: React.Dispatch<React.SetStateAction<"month" | "consecutive">>;
  date: DateManager;
  setDate: React.Dispatch<React.SetStateAction<DateManager>>;
}) => {
  if (view === "month") {
    return (
      <div className="flex gap-4 p-4 justify-center items-center text-gray-700 text-xl">
        <button onClick={() => setDate(date.backOneMonth())}>
          <ChevronLeftIcon
            title="Back one month"
            className="cursor-pointer h-6 w-6"
          />
        </button>
        <button onClick={() => setDate(new DateManager())}>
          <h3
            title="Click to return to today"
            className="w-40 text-center cursor-pointer select-none"
          >
            {date.monthAsFullString} {date.year}
          </h3>
        </button>
        <button onClick={() => setDate(date.forwardOneMonth())}>
          <ChevronRightIcon
            title="Forward one month"
            className="cursor-pointer h-6 w-6"
          />
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
