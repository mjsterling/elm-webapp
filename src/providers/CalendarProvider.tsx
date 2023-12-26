import React, { useContext, useState } from "react";
import { DateManager } from "../components/DateManager";
import { useCollection } from "../hooks";
import { Collection } from "../models/collection";
import { DocumentData } from "firebase/firestore";

export enum CalendarView {
  Month,
  Consecutive,
  Rooms,
}

type CalendarProps = {
  view: CalendarView;
  setView: React.Dispatch<React.SetStateAction<CalendarView>>;
  date: DateManager;
  setDate: React.Dispatch<React.SetStateAction<DateManager>>;
  bookingData: Partial<Booking>;
  bookings: DocumentData[];
  setBookingData: React.Dispatch<React.SetStateAction<Partial<Booking>>>;
  bookingModalOpen: boolean;
  setBookingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalendarContext = React.createContext<CalendarProps>({
  view: CalendarView.Month,
  setView: () => {},
  date: new DateManager(),
  setDate: () => {},
  bookings: [],
  bookingData: {},
  setBookingData: () => {},
  bookingModalOpen: false,
  setBookingModalOpen: () => {},
});

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<CalendarView>(CalendarView.Month);
  const [date, setDate] = useState(new DateManager());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<Partial<Booking>>({});

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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarData = () => useContext(CalendarContext);
