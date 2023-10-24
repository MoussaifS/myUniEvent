import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../FireBase";
import { Navigate, Outlet, useLocation , useNavigate} from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import Landing from "../pages/Landing";
import Cookies from "universal-cookie";

const Nav = (props) => {

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
    <AppBar position="static" disableshadow sx={{ backgroundColor: "transparent ", boxShadow:"0" }}>
      <Toolbar variant="dense"	>
        <Typography variant="h6" sx={{ flexGrow: 10 }}>
          UE
        </Typography>
        
      </Toolbar>

    </AppBar>
  );
};

export default Nav;
