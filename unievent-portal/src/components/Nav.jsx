import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import { useState , useEffect } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const emailCookie = cookies.get("email");
  const [userEmail,setUserEmail] = useState(null) 
  // setUserEmail(emailCookie ? null : emailCookie)


  useEffect(() => {
    setUserEmail(emailCookie);
  }, []);

  const handleLogout = () => {
    const authUser = null;
    setUserEmail(null)
    const listen = onAuthStateChanged(auth, (user) => {
      user = authUser;
      auth.signOut().then(() => {
        cookies.remove("userName");
        cookies.remove("email");
        navigate("/", { replace: true, state: { from: location } });
      });
    });
  };

  return (
    <div id="nav">
      <div>
        <span id="logo">ue</span>
        <span>UniEvent</span>
      </div>

      <div>
      {userEmail ? (
        <md-outlined-icon-button onClick={handleLogout}>
          <md-icon>
            <svg src="../assets/logout_icon.svg" viewBox="0 0 48 48">
              <path d="../assets/logout_icon.svg"/>
            </svg>
          </md-icon>
        </md-outlined-icon-button>
      ) : null}
      </div>
    </div>
  );
};

export default Nav;
