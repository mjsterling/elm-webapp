import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  Auth,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import * as firebaseui from "firebaseui";
import { Outlet, useNavigate } from "react-router-dom";

type LoginErrors = {
  email?: string;
  password?: string;
  other?: string;
};
type FirebaseProps = {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  user: User | null;
  signIn: (email: string, password: string) => Promise<LoginErrors | void>;
  signOut: () => Promise<void>;
};

const FirebaseContext = React.createContext<FirebaseProps | null>(null);

export const FirebaseProvider = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  const [app] = useState(initializeApp(firebaseConfig));
  const [db] = useState(getFirestore(app));
  const [auth] = useState(getAuth(app));
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    const errors: { [key: string]: string } = {};
    if (!email) {
      errors.email = "Invalid email address.";
      return errors;
    }
    if (!password) {
      errors.password = "Invalid password.";
      return errors;
    }

    return await signInWithEmailAndPassword(
      auth,
      email as string,
      password as string
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate("/");
      })
      .catch((e) => {
        errors.other = e.message();
        return errors;
      });
  };

  const signOut = async () => {
    await auth.signOut().then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <FirebaseContext.Provider value={{ app, db, auth, user, signIn, signOut }}>
      <Outlet />
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  if (!firebase) throw "Firebase is fucked gl";
  const { app, db, auth, user, signIn, signOut } = firebase;
  return { app, db, auth, user, signIn, signOut };
};
