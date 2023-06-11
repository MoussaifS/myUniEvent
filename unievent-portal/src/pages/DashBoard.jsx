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
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Nav from "../components/Nav";
import Form from "../components/Form";
import Cards from "../components/EventCard";
import CardDisplay from "../components/CardDisplay";
const DashBoard = () => {
  const [toggle, setToggle] = useState(false);

  console.log(<Form />);
  const handleToggle = () => {
    setToggle((t) => !t);
  };

  return (
    <Container maxWidth="xl">
      <Nav/>
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
              <Form />
            </Box>
          </Container>
        </Grid>

        <Grid item xs={6}>
          <Container maxWidth="xl" id="form-container" sx={{
            margin: "20px",
          }}>
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              
              {1 == 1  ?  <p>there is no events</p> : <CardDisplay /> } 
              </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
