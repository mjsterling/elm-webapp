import { useEffect, useMemo, useRef, useState } from "react";
import { DateManager } from "../../../components";
import { SvgChevronButton } from "../../../components/SvgChevronButton";
import { useCollection, useCrud } from "../../../hooks";
import { Collection } from "../../../models/collection";
import { useCalendarData } from "../../../providers/CalendarProvider";
import { BookingStatus } from "../../../models/bookingStatus";
import { DocumentData } from "firebase/firestore";
import clsx from "clsx";
import { useBookingDrag } from "./useBookingDrag";
import { useNumDays } from "./useNumDays";
import { DatesHeader } from "./DatesHeader";

export const ConsecutiveCalendar = () => {
  const {
    bookings,
    date,
    setDate,
    setBookingData,
    setBookingModalOpen,
    hoveredBooking,
    setHoveredBooking,
  } = useCalendarData();
  const { update } = useCrud(Collection.bookings);
  const rooms = useCollection(Collection.rooms);

  const numDays = useNumDays();

  const cellWidth = 100;
  const cellHeight = 70;
  const viewStartDate = date.asDays - Math.floor(numDays / 2);
  const dates = Array.from(new Array(numDays).keys()).map(
    (n) => n + viewStartDate
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

  return (
    <div className="w-full h-full max-h-full max-w-full py-8 flex justify-center items-center">
      {bookingsForDateRange.map((booking) => (
        <rect
          x={(booking.startDateAsDays - date.asDays) * 100}
          y={35 + booking.room * 70}
          height={50}
          width={(booking.endDateAsDays - booking.startDateAsDays) * 100}
        />
      ))}
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
            ? bookingDrag.movePx
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
                  : "opacity-0 hover:opacity-80 cursor-pointer"
              )}
              onClick={() => {
                setBookingData({
                  startDate: new Date(
                    (dates[0] - 1 + (index % numDays)) * 86.4e6
                  ),
                  endDate: new Date(
                    (dates[1] - 1 + (index % numDays)) * 86.4e6
                  ),
                  room: Math.floor(index / (numDays - 1)) + 1,
                });
                setBookingModalOpen(true);
              }}
            >
              <rect
                x={cellWidth * 0.7 + cellWidth * (index % (numDays - 1))}
                y={
                  cellHeight * Math.floor(index / (numDays - 1)) +
                  cellHeight * 0.1
                }
                width={cellWidth * 0.6}
                height={cellHeight * 0.8}
                stroke="none"
                fill={"rgb(29, 78, 216)"}
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
            const cellY = cellHeight * 0.1 + (booking.room - 1) * cellHeight;
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

            return (
              <g>
                {/* Drag Left Handler */}
                <rect
                  className="cursor-ew-resize"
                  rx={5}
                  x={cellX - cellWidth * 0.07}
                  fill="skyblue"
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
                      movePx: 0,
                      svgStartPx: left,
                      svgEndPx: right,
                      cellWidthPx: (right - left) / numDays,
                      hasMoved: false,
                    });
                  }}
                />
                {/* Drag Right Handler */}
                <rect
                  className="cursor-ew-resize"
                  rx={5}
                  x={
                    cellX +
                    cellWidth * (bookingLengthDays - 1) +
                    cellWidth * 0.37
                  }
                  fill="skyblue"
                  y={cellY}
                  width={50}
                  height={height}
                  onMouseDown={(e) => {
                    if (!tableRef.current) return;
                    const { left, right } =
                      tableRef.current?.getBoundingClientRect();
                    setBookingDrag({
                      dragging: true,
                      movePx: 0,
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
                      ? bookingDrag.movePx
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
                      movePx: e.clientX,
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
                    console.log(bookingDrag.hasMoved);
                    if (
                      Math.abs(bookingDrag.movePx - e.clientX) < 5 &&
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
                  fill={"rgb(29, 78, 216)"}
                />
                <text
                  className="pointer-events-none"
                  fill="white"
                  alignmentBaseline="middle"
                  fontWeight={500}
                  x={
                    Math.max(0, Math.min(cellX, cellWidth * numDays * 100)) + 5
                  }
                  y={cellY + height / 3}
                  fontSize={16}
                >
                  {cellNameDisplay}
                </text>
                {Array.from(new Array(5).keys()).map((i) => (
                  <circle
                    className="pointer-events-none"
                    cx={Math.max(10, cellX + 10) + i * (cellWidth / 7)}
                    cy={cellY + (height * 2) / 3}
                    r={5}
                    stroke="white"
                    fill={i <= statusAsNumber ? "white" : "none"}
                  />
                ))}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
