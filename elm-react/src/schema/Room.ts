import Realm, { ObjectSchema } from "realm";
import { RoomType } from ".";

export class Room extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  number: number;
  petsAllowed: boolean;
  roomType: RoomType;
  wheelchairAccessible: boolean;

  static schema: ObjectSchema = {
    name: "Room",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      bookings: {
        type: "linkingObjects",
        objectType: "Booking",
        property: "room",
      },
      createdAt: "date",
      updatedAt: "date",
      number: "int",
      petsAllowed: "bool",
      roomType: "RoomType",
      wheelchairAccessible: "bool",
    },
  };
}
