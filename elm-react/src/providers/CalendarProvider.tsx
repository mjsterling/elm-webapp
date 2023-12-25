import React, { useContext, useState } from "react";
import { DateManager } from "../components/DateManager";

export enum CalendarView {
  Month,
  Consecutive,
}

type CalendarProps = {
  view: CalendarView;
  setView: React.Dispatch<React.SetStateAction<CalendarView>>;
  date: DateManager;
  setDate: React.Dispatch<React.SetStateAction<DateManager>>;
  bookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
};

const CalendarContext = React.createContext<CalendarProps>({
  view: CalendarView.Month,
  setView: () => {},
  date: new DateManager(),
  setDate: () => {},
  bookingModalOpen: false,
  openBookingModal: () => {},
  closeBookingModal: () => {},
});

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<CalendarView>(CalendarView.Month);
  const [date, setDate] = useState(new DateManager());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const openBookingModal = () => {
    setBookingModalOpen(true);
  };
  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  return (
    <CalendarContext.Provider
      value={{
        view,
        setView,
        date,
        setDate,
        bookingModalOpen,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarData = () => useContext(CalendarContext);
