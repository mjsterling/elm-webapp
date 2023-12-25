import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWUXf98K_5xc784PPnlsAB0w-cPtPMXgI",
  authDomain: "elm-pms.firebaseapp.com",
  projectId: "elm-pms",
  storageBucket: "elm-pms.appspot.com",
  messagingSenderId: "136673088923",
  appId: "1:136673088923:web:5936c49df1bcb39b28fd3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
// const FirestoreContext = createContext<{ db: Firestore } | null>(null);

// export const FirestoreProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const db = getFirestore(app);
//   return (
//     <FirestoreContext.Provider value={{ db }}>
//       {children}
//     </FirestoreContext.Provider>
//   );
// };

// export const useFirestore = useContext(FirestoreContext);
