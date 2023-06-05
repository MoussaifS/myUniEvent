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
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Nav from "../components/Nav";
import Form from "../components/Form";
import Cards from "../components/EventCard";
import CardDisplay from "../components/CardDisplay"
const DashBoard = () => {
  const [toggle, setToggle] = useState(false);

  console.log(<Form />);
  const handleToggle = () => {
    setToggle((t) => !t);
  };

  return (
    <Container maxWidth="xl">
      <Nav />
      <Grid container spacing={8}>
        <Grid item xs={6}>
        <Form/>
        </Grid>
 

      
        <Grid item xs={6}>
        <CardDisplay/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
