import { useEffect } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    auth.signOut();
    navigate("/login");
  }, []);
  return null;
};

export default Logout;
