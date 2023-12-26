import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { Collection } from "../models/collection";
import { useFirebase } from "../providers/FirebaseProvider";

export const useCrud = (collection: Collection) => {
  const { db } = useFirebase();
  const create = async (fields: any) => {
    await setDoc(doc(db, collection), {
      ...fields,
    });
  };
  const update = async (id: string, fields: any) => {
    await updateDoc(doc(db, collection, id), { ...fields });
  };
  const destroy = async (id: string) => {
    await deleteDoc(doc(db, collection, id));
  };

  return { create, update, destroy };
};
