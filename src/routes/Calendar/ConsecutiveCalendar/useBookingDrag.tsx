import type { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { Collection } from "../../../models/collection";
import { useCrud } from "../../../hooks";
import { useCalendarData } from "../../../providers/CalendarProvider";

export const useBookingDrag = () => {
  const { setHoveredBooking } = useCalendarData();
  const { update } = useCrud(Collection.bookings);

  const defaultBookingDrag = () => ({
    dragging: false,
    booking: null,
    start: 0,
    startPx: -1,
    moveXPx: 0,
    moveYPx: 0,
    end: 0,
    endPx: -1,
    svgStartPx: 0,
    svgEndPx: 0,
    cellWidthPx: 0,
    hasMoved: false,
  });

  const [bookingDrag, setBookingDrag] = useState<{
    dragging: boolean;
    booking: DocumentData | null;
    start: number;
    startPx: number;
    end: number;
    endPx: number;
    moveXPx: number;
    svgStartPx: number;
    svgEndPx: number;
    cellWidthPx: number;
    hasMoved: boolean;
  }>(defaultBookingDrag);

  const resetBookingDrag = () => {
    setBookingDrag(defaultBookingDrag);
    setHoveredBooking("");
  };

  const handleContainerMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!bookingDrag.dragging) return;

    const absoluteMouseMoveDelta = Math.abs(
      (bookingDrag.startPx || bookingDrag.endPx || bookingDrag.moveXPx) -
        e.clientX
    );
    if (absoluteMouseMoveDelta >= bookingDrag.cellWidthPx / 2) {
      setBookingDrag((drag) => {
        return {
          ...drag,
          hasMoved: true,
        };
      });
    }
    if (bookingDrag.moveXPx) {
      setBookingDrag((drag) => {
        const bookingDateDelta = Math.round(
          (e.clientX - drag.moveXPx) / drag.cellWidthPx
        );
        return {
          ...drag,
          start: drag.booking!.startDateAsDays + bookingDateDelta,
          end: drag.booking!.endDateAsDays + bookingDateDelta,
        };
      });
    } else {
      setBookingDrag((drag) => {
        const bookingStartDateDelta = Math.round(
          (e.clientX - drag.startPx) / drag.cellWidthPx
        );
        const bookingEndDateDelta = Math.round(
          (e.clientX - drag.endPx) / drag.cellWidthPx
        );
        return {
          ...drag,
          start:
            drag.start > 0
              ? Math.min(
                  drag.booking!.endDateAsDays - 1,
                  drag.booking!.startDateAsDays + bookingStartDateDelta
                )
              : drag.start,
          end:
            drag.end > 0
              ? Math.max(
                  drag.booking!.startDateAsDays + 1,
                  drag.booking!.endDateAsDays + bookingEndDateDelta
                )
              : drag.end,
        };
      });
    }
  };

  const handleContainerMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!bookingDrag.dragging) return;
    if (
      bookingDrag.moveXPx &&
      bookingDrag.start === bookingDrag.booking!.startDateAsDays
    )
      return resetBookingDrag();
    if (
      bookingDrag.startPx &&
      bookingDrag.start === bookingDrag.booking!.startDateAsDays
    )
      return resetBookingDrag();
    if (
      bookingDrag.endPx &&
      bookingDrag.end === bookingDrag.booking!.endDateAsDays
    )
      return resetBookingDrag();

    if (
      bookingDrag.moveXPx &&
      bookingDrag.start !== bookingDrag.booking!.startDateAsDays
    ) {
      update({
        ...bookingDrag.booking,
        startDate: new Date(bookingDrag.start * 86.4e6),
        endDate: new Date(bookingDrag.end * 86.4e6),
      }).then(resetBookingDrag);
    } else if (
      bookingDrag.start &&
      bookingDrag.start !== bookingDrag.booking!.startDateAsDays
    ) {
      update({
        ...bookingDrag.booking,
        startDate: new Date(bookingDrag.start * 86.4e6),
      }).then(() => {
        setBookingDrag({
          ...defaultBookingDrag(),
        });
      });
    } else if (
      bookingDrag.end &&
      bookingDrag.end !== bookingDrag.booking!.endDateAsDays
    ) {
      update({
        ...bookingDrag.booking,
        endDate: new Date(bookingDrag.end * 86.4e6),
      }).then(resetBookingDrag);
    }
  };

  return {
    bookingDrag,
    setBookingDrag,
    resetBookingDrag,
    handleContainerMouseMove,
    handleContainerMouseUp,
  };
};
