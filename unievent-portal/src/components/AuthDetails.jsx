import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../FireBase";
import { Navigate , Outlet  ,useLocation} from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Landing from "../pages/Landing";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const location = useLocation()
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);
};

export default AuthDetails;
