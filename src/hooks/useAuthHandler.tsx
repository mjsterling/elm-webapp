import { useEffect } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { useNavigate } from "react-router-dom";

export const useAuthHandler = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
    return unsub;
  }, [auth]);
};
