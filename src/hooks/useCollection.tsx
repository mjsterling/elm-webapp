import { useEffect, useState } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { Collection } from "../models/collection";

export const useCollection = (_collection: Collection) => {
  const { db } = useFirebase();
  const [records, setRecords] = useState<DocumentData[]>();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, _collection)),
      (querySnapshot) => {
        const _records: DocumentData[] = [];
        querySnapshot.forEach((doc) => _records.push(doc.data()));
        setRecords(_records);
      }
    );
    return unsubscribe;
  }, []);
  return records;
};
