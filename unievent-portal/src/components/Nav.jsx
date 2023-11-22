import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import { useState, useEffect } from "react";
import LogoutIcone from "../assets/logout_icon.svg";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const emailCookie = cookies.get("email");
  const [userEmail, setUserEmail] = useState(null);
  // setUserEmail(emailCookie ? null : emailCookie)

  console.log(userEmail);
  useEffect(() => {
    setUserEmail(emailCookie);
  }, [emailCookie]);

  const handleLogout = () => {
    setUserEmail(null); 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      auth.signOut().then(() => {
        console.log("Logged out successfully");
        cookies.remove("userName");
        cookies.remove("email");
        navigate("/", { replace: true, state: { from: location } });
      });
    });
    unsubscribe();
  };

  return (
    <div id="nav">
      <div>
        <span id="logo">ue</span>
        <span>UniEvent</span>
      </div>

      <div>
        {userEmail != undefined ? (
          <md-outlined-icon-button onClick={() => handleLogout()}>
            <md-icon>
              <img src={LogoutIcone} />
            </md-icon>
          </md-outlined-icon-button>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
