import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase";
import { useLocation , useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const handleLogout = () => {
    const authUser = null;
    const listen = onAuthStateChanged(auth, (user) => {
      user = authUser;
      auth.signOut()
          .then(() => {
            cookies.remove('userName');
            cookies.remove('email');
            navigate("/", { replace: true, state: { from: location } });

          })
    });
  };

  return (
    
    <div id="nav">
      <span id="logo">
          ue
      </span>
    </div>
  );
};

export default Nav;
