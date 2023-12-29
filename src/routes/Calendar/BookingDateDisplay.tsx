type BookingDateDisplayProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

type BookingDateDisplay = React.FC<BookingDateDisplayProps>;

export const BookingDateDisplay: BookingDateDisplay = ({
  startDate,
  endDate,
}) => {
  const numNights = Math.floor(
    ((endDate?.getTime() ?? 0) - (startDate?.getTime() ?? 0)) / 86.4e6
  );

  return (
    <h4>
      {startDate?.toLocaleDateString("en-AU")}
      {endDate ? " - " : null}
      {endDate?.toLocaleDateString("en-AU")}
      {endDate ? (
        <span className="font-semibold">
          {" ("}
          {numNights}
          {` night${numNights > 1 ? "s" : ""})`}
        </span>
      ) : null}
    </h4>
  );
};
