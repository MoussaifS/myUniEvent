import * as React from "react";
import pic from "../assets/image1-removebg.png";
import { Container, Typography, Grid, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const Landing = () => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={6}>
        <Container maxWidth="sm" id="landing-form">
          <Login />
          <SignUp />
        </Container>
      </Grid>
      <Grid item xs={6}>
        <Container maxWidth="sm" id="landing-prom">
          <Typography variant="h2" gutterBottom>
            Uni-Event
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur
        </Typography>
          <img src={pic} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Landing;
