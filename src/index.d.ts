interface Addon {
  id: string;
  name: string;
  price: number;
  type: "Flat" | "Per person";
}

interface Booking {
  id: string;
  status: import("./models/bookingStatus").BookingStatus;
  addons: { name: string; count: number }[];
  contactEmail?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPhone?: string;
  endDate: Date;
  numAdults: number;
  numChildren: number;
  petDescription?: string;
  pets: boolean;
  room: number;
  startDate: Date;
  statusReceivedDate?: Date;
  statusConfirmedDate?: Date;
  statusCheckedInDate?: Date;
  statusCheckedOutDate?: Date;
  statusRoomCleanedDate?: Date;
}

interface Room {
  id: string;
  petsAllowed: boolean;
  roomNumber: number;
  roomType: string;
  wheelchairAccessible: boolean;
}

interface RoomType {
  id: string;
  beds_double: number;
  beds_king: number;
  beds_queen: number;
  beds_single: number;
  capacity: number;
  description: string;
  name: string;
  price_offpeak: number;
  price_peak: number;
  rooms: string[];
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
