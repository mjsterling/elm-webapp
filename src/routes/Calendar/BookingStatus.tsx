import { useCalendarData } from "../../providers/CalendarProvider";
import { BookingStatus } from "../../models/bookingStatus";
import { StyledButton } from "../../components";
import { Collection } from "../../models/collection";
import { useCrud } from "../../hooks";

export const BookingStatusDisplay = () => {
  const { bookingData, setBookingData } = useCalendarData();
  const { update } = useCrud(Collection.bookings);

  const status: BookingStatus = bookingData.status ?? BookingStatus.received;

  const statusIndex = Object.values(BookingStatus).indexOf(status);

  const statusFieldMap: { [P in BookingStatus]: keyof Booking } = {
    [BookingStatus.received]: "statusReceivedDate",
    [BookingStatus.confirmed]: "statusConfirmedDate",
    [BookingStatus.checkedIn]: "statusCheckedInDate",
    [BookingStatus.checkedOut]: "statusCheckedOutDate",
    [BookingStatus.roomCleaned]: "statusRoomCleanedDate",
  };

  const SelfAwareStatusButton = ({
    forStatus,
    index,
  }: {
    forStatus: BookingStatus;
    index: number;
  }) => {
    return (
      <div className="flex flex-col gap-0.5 relative">
        <StyledButton
          style={{
            transform: forStatus === status ? "scale(1)" : "scale(0.8)",
          }}
          label={forStatus}
          mode={forStatus === status ? "contained" : "outlined"}
          theme={index < statusIndex ? "grey" : "primary"}
          onClick={() => {
            const prevDateIfAny = bookingData[statusFieldMap[forStatus]] as
              | Date
              | undefined;
            const prevStatus = bookingData.status;
            setBookingData({
              ...bookingData,
              status: forStatus,
              [statusFieldMap[forStatus]]: prevDateIfAny ?? new Date(),
            });
            update({
              id: bookingData.id,
              status: forStatus,
              [statusFieldMap[forStatus]]: prevDateIfAny ?? new Date(),
            }).catch((e) => {
              console.error(e);
              setBookingData({
                ...bookingData,
                status: prevStatus,
                [statusFieldMap[forStatus]]: prevDateIfAny,
              });
            });
          }}
          className="rounded-none"
        />
        <span className="text-[10px] text-gray-700 w-full text-center">
          {bookingData[statusFieldMap[forStatus]]?.toLocaleString("en-AU", {
            // @ts-expect-error
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }) ?? ""}
        </span>
      </div>
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
