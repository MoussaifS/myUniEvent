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

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    const authUser = null;
    const listen = onAuthStateChanged(auth, (user) => {
      console.log(user)
      user = authUser;
      console.log(user)
      auth.signOut()
          .then(() => {
            navigate("/", { replace: true, state: { from: location } });
          })
    });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#9BA8A8 " }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Uni-Event
        </Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Welcome, User!
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
