import { useMemo } from "react";
import { useCollection } from "../../hooks";
import { Collection } from "../../models/collection";
import { useCalendarData } from "../../providers/CalendarProvider";
import clsx from "clsx";
import { BookingStatus } from "../../models/bookingStatus";

export const RoomCalendar = () => {
  const rooms = useCollection(Collection.rooms);
  const { date, bookings } = useCalendarData();
  const todaysBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.startDateAsDays <= date.asDays &&
          booking.endDateAsDays >= date.asDays
      ),
    [date, bookings]
  );

  return (
    <div
      className="grid h-full gap-4 p-4 pb-8 w-full overflow-y-auto"
      style={{
        gridTemplateRows: "repeat(auto-fit, minmax(200px, 1fr))",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      }}
    >
      {rooms
        .sort((a, b) => a.roomNumber - b.roomNumber)
        .map((room) => {
          const todaysBookingsForThisRoom = todaysBookings
            .filter((booking) =>
              (booking.rooms ?? []).includes(room.roomNumber)
            )
            .sort((a, b) => a.endDateAsDays - b.endDateAsDays);
          const [currentBooking] = todaysBookingsForThisRoom;
          return (
            <div
              className={clsx(
                "flex flex-col rounded p-4 gap-2 items-center justify-between",
                currentBooking
                  ? currentBooking.status === BookingStatus.checkedOut
                    ? "bg-pink-50 border border-pink-300"
                    : "bg-blue-50 border border-blue-300"
                  : "bg-green-50 border border-green-300"
              )}
            >
              <h2 className="text-xl underline font-semibold">
                Room {room.roomNumber}
              </h2>
              {!currentBooking ? (
                <>
                  <h3 className="font-semibold">Vacant</h3>
                  <div />
                </>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};
