import { useEffect, useMemo, useRef } from "react";
import { useCollection, useCrud } from "../../../hooks";
import { Collection } from "../../../models/collection";
import { useCalendarData } from "../../../providers/CalendarProvider";
import { BookingStatus } from "../../../models/bookingStatus";
import clsx from "clsx";
import { useBookingDrag } from "./useBookingDrag";
import { useNumDays } from "./useNumDays";
import { DatesHeader } from "./DatesHeader";
import { UserIcon } from "./UserIcon";

export const ConsecutiveCalendar = () => {
  const {
    bookings,
    date,
    setBookingData,
    setBookingModalOpen,
    hoveredBooking,
    setHoveredBooking,
  } = useCalendarData();
  const rooms = useCollection(Collection.rooms);

  const numDays = useNumDays();

  const cellWidth = 100;
  const cellHeight = 70;
  const viewStartDate = date.asDays - Math.floor(numDays / 2);
  const dates = Array.from(new Array(numDays).keys()).map(
    (n) => n + viewStartDate + 1
  );
  const bookingsForDateRange = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.startDateAsDays <= date.asDays + numDays / 2 ||
          booking.endDateAsDays >= date.asDays - numDays / 2
      ),
    [bookings, date, numDays]
  );

  const tableRef = useRef<SVGRectElement>(null);

  const {
    bookingDrag,
    setBookingDrag,
    handleContainerMouseMove,
    handleContainerMouseUp,
    resetBookingDrag,
  } = useBookingDrag();

  const statusColors: { [P in BookingStatus]: string } = {
    [BookingStatus.received]: "#4E516C",
    [BookingStatus.confirmed]: "#3E538C",
    [BookingStatus.checkedIn]: "#1D4ED8",
    [BookingStatus.checkedOut]: "#741B61",
    [BookingStatus.roomCleaned]: "#036834",
  };

  return (
    <div className="w-full h-full max-h-full max-w-full py-8 flex justify-center items-center">
      <svg
        onMouseMove={handleContainerMouseMove}
        onMouseUp={handleContainerMouseUp}
        onMouseLeave={() => {
          if (bookingDrag.dragging) {
            resetBookingDrag();
          }
        }}
        viewBox={`-${cellWidth} -${cellHeight} ${
          numDays * cellWidth + cellWidth * 2
        } ${cellHeight * 15}`}
        fontSize={24}
        className={clsx(
          "select-none max-h-full",
          bookingDrag.dragging
            ? bookingDrag.moveXPx
              ? "cursor-grabbing"
              : "cursor-ew-resize"
            : "cursor-default"
        )}
      >
        <DatesHeader dates={dates} numDays={numDays} />

        {rooms
          .sort((a, b) => a.roomNumber - b.roomNumber)
          .map((room, i) => (
            <text
              x={-(cellWidth / 2)}
              y={cellHeight / 2 + i * cellHeight}
              alignmentBaseline="middle"
              textAnchor="middle"
              fontWeight={700}
            >
              {room.roomNumber}
            </text>
          ))}
        {/* End Headers */}

        {/* Table Container */}
        <rect
          ref={tableRef}
          x={0}
          y={0}
          width={cellWidth * numDays}
          height={rooms.length * cellHeight}
          fill="none"
        />

        {/* Cells */}
        {Array.from(new Array(rooms.length * numDays).keys()).map((index) => (
          <rect
            x={cellWidth * (index % numDays)}
            y={cellHeight * Math.floor(index / numDays)}
            width={cellWidth}
            height={cellHeight}
            stroke="#777"
            fill="none"
            r={2}
          />
        ))}

        {/* New Booking Rects */}

        {Array.from(new Array(rooms.length * (numDays - 1)).keys()).map(
          (index) => (
            <g
              className={clsx(
                bookingDrag.dragging
                  ? "hidden"
                  : "opacity-10 hover:opacity-100 cursor-pointer"
              )}
              onClick={() => {
                setBookingData({
                  startDate: new Date(
                    (dates[0] + (index % (numDays - 1))) * 86.4e6
                  ),
                  endDate: new Date(
                    (dates[0] + 1 + (index % (numDays - 1))) * 86.4e6
                  ),
                  rooms: [Math.floor(index / (numDays - 1)) + 1],
                });
                setBookingModalOpen(true);
              }}
            >
              <rect
                x={cellWidth * 0.6 + cellWidth * (index % (numDays - 1))}
                y={
                  cellHeight * Math.floor(index / (numDays - 1)) +
                  cellHeight * 0.1
                }
                width={cellWidth * 0.8}
                height={cellHeight * 0.8}
                stroke="none"
                fill={"#1d4ed8"}
                rx={5}
              />
              <text
                fill="white"
                fontSize={30}
                textAnchor="middle"
                alignmentBaseline="middle"
                x={cellWidth + cellWidth * (index % (numDays - 1))}
                y={
                  cellHeight * Math.floor(index / (numDays - 1)) +
                  cellHeight * 0.5
                }
              >
                +
              </text>
            </g>
          )
        )}

        {/* Booking Lines */}
        <defs>
          <clipPath id="booking-container">
            <path
              d={`M 0,0 h ${numDays * cellWidth} v ${
                rooms.length * cellHeight
              } h ${-numDays * cellWidth} Z`}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#booking-container)">
          {bookingsForDateRange.map((booking) => {
            const bookingLengthDays =
              bookingDrag.dragging && bookingDrag.booking?.id === booking.id
                ? (bookingDrag.end || booking.endDateAsDays) -
                  (bookingDrag.start || booking.startDateAsDays)
                : booking.endDateAsDays - booking.startDateAsDays;
            const cellX =
              cellWidth * 1.6 +
              ((bookingDrag.dragging && bookingDrag.booking?.id === booking.id
                ? bookingDrag.start || booking.startDateAsDays
                : booking.startDateAsDays) -
                dates[0]) *
                100;
            const width = (bookingLengthDays - 1) * cellWidth + cellWidth * 0.8;
            const height = cellHeight * 0.8;
            const hasBothNames =
              booking.contactFirstName && booking.contactLastName;
            const cellNameDisplay =
              hasBothNames && !(bookingLengthDays === 1 || cellX <= 0)
                ? `${booking.contactFirstName} ${booking.contactLastName}`
                : booking.contactLastName ?? booking.contactFirstName;

            const statusAsNumber = Object.values(BookingStatus).indexOf(
              booking.status
            );

            return (booking.rooms ?? [booking.room]).map(
              (roomNumber: number) => {
                const cellY = cellHeight * 0.1 + (roomNumber - 1) * cellHeight;

                const GuestsDisplay = () => {
                  const displayArray: JSX.Element[] = [];
                  if (booking.numAdults === 1) {
                    displayArray.push(
                      <UserIcon
                        size={18}
                        x={cellX + cellWidth * 0.2}
                        y={cellY + cellHeight * 0.5}
                      />
                    );
                  } else if (booking.numAdults === 2) {
                    displayArray.push(
                      <UserIcon
                        size={18}
                        x={cellX + cellWidth * 0.12}
                        y={cellY + cellHeight * 0.5}
                      />,
                      <UserIcon
                        size={18}
                        x={cellX + cellWidth * 0.3}
                        y={cellY + cellHeight * 0.5}
                      />
                    );
                  } else if (booking.numAdults > 2) {
                    displayArray.push(
                      <text
                        x={cellX + cellWidth * 0.14}
                        fill="white"
                        fontSize={18}
                        alignmentBaseline="middle"
                        textAnchor="middle"
                        y={cellY + cellHeight * 0.56 + 1}
                        fontWeight={500}
                      >
                        {booking.numAdults}
                      </text>,
                      <UserIcon
                        size={18}
                        x={cellX + cellWidth * 0.3}
                        y={cellY + cellHeight * 0.5}
                      />
                    );
                  }

                  if (booking.numChildren > 2) {
                    displayArray.push(
                      <text
                        x={cellX + cellWidth * 0.55}
                        y={cellY + cellHeight * 0.52 + 6}
                        fill="white"
                        fontSize={16}
                        alignmentBaseline="middle"
                        fontWeight={500}
                        textAnchor="middle"
                      >
                        {booking.numChildren}
                      </text>,
                      <UserIcon
                        size={13}
                        x={cellX + cellWidth * 0.68}
                        y={cellY + cellHeight * 0.52}
                      />
                    );
                  } else if (booking.numChildren === 2) {
                    displayArray.push(
                      <UserIcon
                        size={13}
                        x={cellX + cellWidth * 0.52}
                        y={cellY + cellHeight * 0.52}
                      />,
                      <UserIcon
                        size={13}
                        x={cellX + cellWidth * 0.68}
                        y={cellY + cellHeight * 0.52}
                      />
                    );
                  } else if (booking.numChildren === 1) {
                    displayArray.push(
                      <UserIcon
                        size={13}
                        x={cellX + cellWidth * 0.52}
                        y={cellY + cellHeight * 0.52}
                      />
                    );
                  }
                  return <>{displayArray}</>;
                };

                return (
                  <g
                    onMouseOver={() => {
                      if (!bookingDrag.dragging) {
                        setHoveredBooking(booking.id);
                      }
                    }}
                    onMouseOut={() => {
                      if (!bookingDrag.dragging) {
                        setHoveredBooking("");
                      }
                    }}
                  >
                    {/* Drag Left Handler */}
                    <rect
                      className="cursor-ew-resize opacity-50"
                      rx={5}
                      x={cellX - cellWidth * 0.07}
                      fill={statusColors[booking.status as BookingStatus]}
                      y={cellY}
                      width={50}
                      height={height}
                      onMouseDown={(e) => {
                        if (!tableRef.current) return;
                        const { left, right } =
                          tableRef.current?.getBoundingClientRect();
                        setBookingDrag({
                          dragging: true,
                          booking: { ...booking },
                          start: booking.startDateAsDays,
                          startPx: e.clientX,
                          end: 0,
                          endPx: 0,
                          moveXPx: 0,
                          svgStartPx: left,
                          svgEndPx: right,
                          cellWidthPx: (right - left) / numDays,
                          hasMoved: false,
                        });
                      }}
                    />
                    {/* Drag Right Handler */}
                    <rect
                      className="cursor-ew-resize opacity-50"
                      rx={5}
                      x={
                        cellX +
                        cellWidth * (bookingLengthDays - 1) +
                        cellWidth * 0.37
                      }
                      fill={statusColors[booking.status as BookingStatus]}
                      y={cellY}
                      width={50}
                      height={height}
                      onMouseDown={(e) => {
                        if (!tableRef.current) return;
                        const { left, right } =
                          tableRef.current?.getBoundingClientRect();
                        setBookingDrag({
                          dragging: true,
                          moveXPx: 0,
                          booking: { ...booking },
                          start: 0,
                          startPx: 0,
                          end: booking.endDateAsDays,
                          endPx: e.clientX,
                          svgStartPx: left,
                          svgEndPx: right,
                          cellWidthPx: (right - left) / numDays,
                          hasMoved: false,
                        });
                      }}
                    />
                    <rect
                      className={clsx(
                        bookingDrag.dragging
                          ? bookingDrag.moveXPx
                            ? "cursor-grabbing"
                            : "cursor-ew-resize"
                          : "cursor-grab"
                      )}
                      onMouseDown={(e) => {
                        if (!tableRef.current) return;
                        const { left, right } =
                          tableRef.current?.getBoundingClientRect();
                        setBookingDrag({
                          dragging: true,
                          moveXPx: e.clientX,
                          booking: { ...booking },
                          start: booking.startDateAsDays,
                          startPx: 0,
                          end: booking.endDateAsDays,
                          endPx: 0,
                          svgStartPx: left,
                          svgEndPx: right,
                          cellWidthPx: (right - left) / numDays,
                          hasMoved: false,
                        });
                      }}
                      onMouseUp={(e) => {
                        if (
                          Math.abs(bookingDrag.moveXPx - e.clientX) < 5 &&
                          !bookingDrag.hasMoved
                        ) {
                          resetBookingDrag();
                          setBookingData({ ...booking });
                          setBookingModalOpen(true);
                        }
                      }}
                      rx={5}
                      ry={5}
                      x={cellX}
                      y={cellY}
                      width={width}
                      height={height}
                      fill={
                        hoveredBooking === booking.id
                          ? "black"
                          : statusColors[booking.status as BookingStatus]
                      }
                    />
                    {booking.endDateAsDays >= dates[0] ? (
                      <>
                        <text
                          className="pointer-events-none"
                          fill="white"
                          alignmentBaseline="middle"
                          fontWeight={500}
                          x={Math.max(
                            cellWidth * 0.05,
                            cellX + cellWidth * 0.05
                          )}
                          y={cellY + height / 3}
                          fontSize={16}
                        >
                          {cellNameDisplay}
                        </text>
                        <GuestsDisplay />
                        {/* {Array.from(new Array(5).keys()).map((i) => (
                          <circle
                            className="pointer-events-none"
                            cx={
                              Math.max(
                                cellWidth * 0.1,
                                cellX + cellWidth * 0.1
                              ) +
                              i * (cellWidth / 7)
                            }
                            cy={cellY + (height * 2) / 3}
                            r={5}
                            stroke="white"
                            fill={i <= statusAsNumber ? "white" : "none"}
                          />
                        ))} */}
                      </>
                    ) : null}
                  </g>
                );
              }
            );
          })}
        </g>
      </svg>
    </div>
  );
};
