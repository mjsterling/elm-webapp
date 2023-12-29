import React, { useContext, useState } from "react";
import { useCalendarData } from "../../providers/CalendarProvider";
import dayjs, { Dayjs } from "dayjs";

type DateRangePickerContextProps = {
  viewDate: Dayjs;
  setViewDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setDates: (dates: { startDate?: Date; endDate?: Date }) => void;
};
const DateRangePickerContext = React.createContext<DateRangePickerContextProps>(
  {
    viewDate: dayjs(),
    setViewDate: () => {},
    startDate: undefined,
    endDate: undefined,
    setDates: () => {},
  }
);

export const DateRangePickerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [viewDate, setViewDate] = useState(dayjs());
  const { bookingData, setBookingData } = useCalendarData();
  const setDates: DateRangePickerContextProps["setDates"] = ({
    startDate,
    endDate,
  }) => {
    setBookingData({
      ...bookingData,
      startDate: startDate ?? bookingData.startDate,
      endDate: endDate ?? bookingData.endDate,
    });
  };
  return (
    <DateRangePickerContext.Provider
      value={{
        viewDate,
        setViewDate,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        setDates,
      }}
    >
      {children}
    </DateRangePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DateRangePickerContext);
