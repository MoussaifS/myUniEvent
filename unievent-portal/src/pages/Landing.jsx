import * as React from "react";
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
import CssBaseline from "@mui/material/CssBaseline";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const Landing = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((t) => !t);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={8}>
        <Grid item xs={6}>
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
        </Grid>

        <Grid item xs={6}>
          <Container maxWidth="sm" id="form-container">
          
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

              <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
                <Divider>-------------  Or {toggle == false ? 'Sign up':'Log in' } With A New Account  -------------</Divider>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleToggle}
              >
              {toggle == false ? 'Sign up':'Log in' }
              </Button>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
