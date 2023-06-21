import * as React from "react";
import { useState, useEffect } from "react";
import pic from "../assets/image1-removebg.png";
import {
  Box,
  Container,
  Divider,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Nav from "../components/Nav";
import Form from "../components/Form";
import { db, auth } from "../FireBase";
import Cards from "../components/Cards";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import { ReactSession } from "react-client-session";

const DashBoard = () => {
  const fetchEventsByEmail = async () => {
    const eventsRef = collection(db, "events");
    const cookies = new Cookies();
    const currentUserEmail = cookies.get("email");
    const q = query(eventsRef, where("email", "==", currentUserEmail.toLowerCase() ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  
  fetchEventsByEmail();


  const [toggle, setToggle] = useState(false);

  return (
    <Container maxWidth="xl">
      <Nav />
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

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Container
            maxWidth="xl"
            id="form-container"
            sx={{
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                minHeight: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              {1 == 2 ? <h1>there is no events</h1> : <Cards />}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
