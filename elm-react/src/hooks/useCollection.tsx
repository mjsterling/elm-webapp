import { useState } from "react";
import { useFirebase } from "../providers/FirebaseProvider";

export const useCollection = (collection: string) => {
  const { db } = useFirebase();
  const [records, setRecords] = useState([]);
};
