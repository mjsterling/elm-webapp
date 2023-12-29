import React, { useContext, useState } from "react";
import { useCollection } from "../hooks";
import { Collection } from "../models/collection";
import { DocumentData } from "firebase/firestore";
import dayjs, { Dayjs } from "dayjs";

export enum CalendarView {
  Month = "Month",
  Consecutive = "Planner",
  Rooms = "Rooms",
}

type CalendarProps = {
  view: CalendarView;
  setView: React.Dispatch<React.SetStateAction<CalendarView>>;
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  bookingData: Partial<Booking>;
  bookings: DocumentData[];
  setBookingData: React.Dispatch<React.SetStateAction<Partial<Booking>>>;
  bookingModalOpen: boolean;
  setBookingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredBooking: string;
  setHoveredBooking: React.Dispatch<React.SetStateAction<string>>;
};

const CalendarContext = React.createContext<CalendarProps>({
  view: CalendarView.Consecutive,
  setView: () => {},
  date: dayjs(),
  setDate: () => {},
  bookings: [],
  bookingData: {},
  setBookingData: () => {},
  bookingModalOpen: false,
  setBookingModalOpen: () => {},
  hoveredBooking: "",
  setHoveredBooking: () => {},
});

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<CalendarView>(CalendarView.Consecutive);
  const [date, setDate] = useState(dayjs());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<Booking>>({});
  const [hoveredBooking, setHoveredBooking] = useState("");

  const bookings = useCollection(Collection.bookings);

  return (
    <CalendarContext.Provider
      value={{
        view,
        setView,
        date,
        setDate,
        bookings,
        bookingData,
        setBookingData,
        bookingModalOpen,
        setBookingModalOpen,
        hoveredBooking,
        setHoveredBooking,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarData = () => useContext(CalendarContext);
