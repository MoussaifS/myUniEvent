import { useState } from "react";
import pic from "../assets/image1-removebg.png";
import {
  Box,
  Container,
  Divider,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
const Landing = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((t) => !t);
  };

  return (
    <div>
      <div>
        <div>
          <Container maxWidth="sm" id="landing-prom">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Typography variant="h2" gutterBottom>
                Uni-Event
              </Typography>
              <Typography variant="h6" gutterBottom>
                Student-Made For Student Use
              </Typography>
              <img
                src={pic}
                alt="Promotional Image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Container>
        </div>

        <div>
          <div id="form-container">
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {toggle == false ? <Login /> : <SignUp />}

              <div>
                <span> or </span>
              </div>

              <button className="filledButton" onClick={handleToggle}>
                {toggle == false ? "Create new account" : "Sign in"}
              </button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
