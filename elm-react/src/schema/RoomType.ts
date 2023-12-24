import Realm, { ObjectSchema } from "realm";

export class RoomType extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  beds_double: number;
  beds_queen: number;
  beds_king: number;
  beds_single: number;
  capacity: number;
  description?: string;
  name: string;
  price_peak: number;
  price_offpeak: number;

  static schema: ObjectSchema = {
    name: "RoomType",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      _partition: "string",
      createdAt: "date",
      updatedAt: "date",
      beds_double: "int",
      beds_queen: "int",
      beds_king: "int",
      beds_single: "int",
      capacity: "int",
      description: "string?",
      name: "string",
      price_peak: "double",
      price_offpeak: "double",
      rooms: {
        type: "linkingObjects",
        objectType: "Room",
        property: "roomType",
      },
    },
  };
}
