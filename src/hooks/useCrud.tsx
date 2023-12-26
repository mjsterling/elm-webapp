import {
  deleteDoc,
  doc,
  updateDoc,
  collection as getCollection,
  addDoc,
} from "firebase/firestore";
import { Collection } from "../models/collection";
import { useFirebase } from "../providers/FirebaseProvider";

export const useCrud = (collection: Collection) => {
  const { db } = useFirebase();
  const collectionRef = getCollection(db, collection);
  const create = async (fields: any) => {
    await addDoc(collectionRef, {
      ...fields,
    });
  };
  const update = async (fields: any) => {
    const { id, ...restData } = fields;
    if (id) {
      await updateDoc(doc(db, collection, id), { ...restData });
    } else {
      alert("Couldnt update record");
    }
  };
  const destroy = async (id: string) => {
    await deleteDoc(doc(db, collection, id));
  };

  return { create, update, destroy };
};
