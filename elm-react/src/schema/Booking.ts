import Realm, { ObjectSchema } from "realm";
import { Room } from ".";

export class Booking extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
  confirmed: boolean;
  numAdults: number;
  numChildren: number;
  pets: boolean;
  petDesc?: string;
  startDate: Date;
  endDate: Date;
  room?: Room;
  static schema: ObjectSchema = {
    name: "Booking",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      _partition: "string",
      createdAt: "date",
      updatedAt: "date",
      contactFirstName: "string?",
      contactLastName: "string?",
      contactEmail: "string?",
      contactPhone: "string?",
      confirmed: { type: "bool", default: false },
      numAdults: "int",
      numChildren: "int",
      pets: "bool",
      petDesc: "string?",
      startDate: "date",
      endDate: "date",
      room: "Room?",
    },
  };
}
