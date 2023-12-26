interface Booking {
  id: string;
  confirmed: boolean;
  contactEmail?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPhone?: string;
  endDate: Date;
  numAdults: number;
  numChildren: number;
  petDescription?: string;
  pets: boolean;
  room: Room;
  startDate: Date;
}

interface Room {
  id: string;
  bookings: Booking[];
  petsAllowed: boolean;
  roomNumber: number;
  roomType: RoomType;
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
  rooms: Room[];
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
