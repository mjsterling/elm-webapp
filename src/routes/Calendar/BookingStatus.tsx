import { useCalendarData } from "../../providers/CalendarProvider";
import { BookingStatus } from "../../models/bookingStatus";
import { StyledButton } from "../../components";

export const BookingStatusDisplay = () => {
  const { bookingData, setBookingData } = useCalendarData();
  const status: BookingStatus = bookingData.status ?? BookingStatus.received;

  const statusIndex = Object.values(BookingStatus).indexOf(status);

  const SelfAwareStatusButton = ({
    forStatus,
    index,
  }: {
    forStatus: BookingStatus;
    index: number;
  }) => {
    return (
      <StyledButton
        label={forStatus}
        mode={forStatus === status ? "contained" : "outlined"}
        theme={index < statusIndex ? "grey" : "primary"}
        onClick={() => {
          setBookingData({ ...bookingData, status: forStatus });
        }}
        className="rounded-none"
      />
    );
  };

  return bookingData.id ? (
    <div className="grid grid-cols-5">
      {Object.values(BookingStatus).map((_status, index) => {
        return <SelfAwareStatusButton forStatus={_status} index={index} />;
      })}
    </div>
  ) : null;
};
