import clsx from "clsx";
import {
  CalendarView,
  useCalendarData,
} from "../../providers/CalendarProvider";
import {
  CalendarDaysIcon,
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";

export const ViewSwitch = () => {
  const { view, setView } = useCalendarData();

  const SelfAwareFab = ({
    viewFor,
    icon,
  }: {
    viewFor: CalendarView;
    icon: JSX.Element;
  }) => (
    <button
      onClick={() => {
        setView(viewFor);
      }}
      className={clsx(
        "gap-2 transition-colors bg-blue-700 rounded-full flex justify-center items-center",
        "border border-blue-700",
        viewFor === view
          ? "bg-blue-700 text-white hover:bg-white hover:text-blue-700 py-2 px-4"
          : "bg-white text-blue-700 hover:bg-blue-700 hover:text-white p-2"
      )}
    >
      <span className="h-6 w-6">{icon}</span>
      {viewFor === view ? <span>{viewFor}</span> : ''}
    </button>
  );

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <SelfAwareFab viewFor={CalendarView.Month} icon={<CalendarDaysIcon />} />
      <SelfAwareFab
        viewFor={CalendarView.Consecutive}
        icon={<TableCellsIcon />}
      />
      <SelfAwareFab viewFor={CalendarView.Rooms} icon={<HomeIcon />} />
    </div>
  );
};
