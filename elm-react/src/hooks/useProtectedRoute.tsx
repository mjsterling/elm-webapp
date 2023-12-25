import { useEffect } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { useNavigate } from "react-router-dom";

export const useAuthHandler = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  });
};

export const useProtectedRoute = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/login");
    }
  }, []);
};

export const useRedirectLoggedInUser = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, []);
};
