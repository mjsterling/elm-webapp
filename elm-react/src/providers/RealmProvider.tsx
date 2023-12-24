import React, { useContext, useEffect, useState } from "react";
import Realm from "realm";
import { schema } from "../schema";

type RealmData = {
  realm?: Realm;
};
const RealmContext = React.createContext<RealmData | null>(null);

type RealmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element;

export const RealmProvider: RealmProvider = ({ children }) => {
  const [realm, setRealm] = useState<Realm>();
  useEffect(() => {
    if (realm) return;
    setRealm(new Realm({ schema }));
  }, [realm]);

  return (
    <RealmContext.Provider value={{ realm }}>{children}</RealmContext.Provider>
  );
};

export const useRealm = useContext(RealmContext);
