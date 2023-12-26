import { useEffect, useState } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { Collection } from "../models/collection";
import { daysSinceEpoch } from "../utils/dateUtils";

export const useCollection = (_collection: Collection) => {
  const { db } = useFirebase();
  const [records, setRecords] = useState<DocumentData[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, _collection)),
      (querySnapshot) => {
        const _records: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const record: { [key: string]: any } = {
            ...doc.data(),
            id: doc.id,
          };
          for (const key in record) {
            const _key = key as keyof typeof record;
            if (
              typeof record[_key] === "object" &&
              record[_key].hasOwnProperty("seconds")
            ) {
              const dateAsDate = new Date(record[_key].seconds * 1000);
              record[_key] = dateAsDate;
              if (_key === "startDate") {
                record.startDateAsDays = daysSinceEpoch(dateAsDate);
              }
              if (_key === "endDate") {
                record.endDateAsDays = daysSinceEpoch(dateAsDate);
              }
            }
          }
          _records.push(record);
        });
        setRecords(_records);
      }
    );
    return unsubscribe;
  }, []);
  return records;
};
