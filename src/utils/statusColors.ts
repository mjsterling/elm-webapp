import { BookingStatus } from "../models/bookingStatus";

export const statusColors: { [P in BookingStatus]: string } = {
  [BookingStatus.received]: "#444466",
  [BookingStatus.confirmed]: "#3E538C",
  [BookingStatus.checkedIn]: "#1D4ED8",
  [BookingStatus.checkedOut]: "#741B61",
  [BookingStatus.roomCleaned]: "#036834",
};
