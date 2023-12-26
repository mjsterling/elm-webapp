import { useEffect, useState } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { DocumentData, collection, doc, onSnapshot } from "firebase/firestore";
import { Collection } from "../models/collection";

export const useRecord = (_collection: Collection, id: string) => {
  const { db } = useFirebase();
  const [record, setRecord] = useState<DocumentData>();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collection(db, _collection), id),
      (_doc) => {
        setRecord(_doc);
      }
    );
    return unsubscribe;
  }, []);
  return record;
};
