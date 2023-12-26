import clsx from "clsx";
import { StyledFab } from "../../components";
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
    <StyledFab
      onClick={() => {
        setView(viewFor);
      }}
      icon={icon}
      className={clsx(
        viewFor === view ? "bg-blue-700 text-white" : "bg-white text-blue-700"
      )}
    />
  );

  return (
    <div className="absolute top-8 right-8 flex gap-2">
      <SelfAwareFab viewFor={CalendarView.Month} icon={<CalendarDaysIcon />} />
      <SelfAwareFab
        viewFor={CalendarView.Consecutive}
        icon={<TableCellsIcon />}
      />
      <SelfAwareFab viewFor={CalendarView.Rooms} icon={<HomeIcon />} />
    </div>
  );
};
