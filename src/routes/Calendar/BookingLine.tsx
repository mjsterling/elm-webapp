type BookingLineProps = {
  booking: Booking;
  date: Date;
};

type BookingLine = React.FC<BookingLineProps>;
export const BookingLine: BookingLine = ({ booking, date }) => {
  const {
    room: { roomNumber },
  } = booking;
  const isStartOfBooking =
    date.getMonth() === booking.startDate.getMonth() &&
    date.getDate() === booking.startDate.getDate();
  const lineColors = [
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
  const lineColor = lineColors[roomNumber];
  return (
    <div
      className="absolute h-3 w-full flex justify-start"
      style={{ top: `${2 + roomNumber * 8}%`, backgroundColor: lineColor }}
    >
      {isStartOfBooking ? (
        <div className="h-3 w-3 p-1 text-white rounded-full ml-[20%]">
          {booking.room.roomNumber}
        </div>
      ) : null}
      <div className="absolute w-full h-1"></div>
    </div>
  );
};
