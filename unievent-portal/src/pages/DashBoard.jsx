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
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "universal-cookie";

const DashBoard = () => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [club, setClub] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchDataByEmail() {
      const eventsRef = collection(db, "events");
      const uniRef = collection(db, "organizers");
      const cookies = new Cookies();
      const currentUserEmail = cookies.get("email");

      const eventsQuery = query(
        eventsRef,
        where("email", "==", currentUserEmail.toLowerCase())
      );

      const uniQuery = query(
        uniRef,
        where("email", "==", currentUserEmail.toLowerCase())
      );

      try {
        const eventsSnapshot = await getDocs(eventsQuery);
        const uniSnapshot = await getDocs(uniQuery);

        if (isMounted) {
          const updatedEvents = eventsSnapshot.docs.map((doc) => doc.data());
          setEvents(updatedEvents);

          uniSnapshot.forEach((doc) => {
            setUni(doc.data().institution.label);
            setClub(doc.data().clubName);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchDataByEmail();

    return () => {
      isMounted = false; // Set flag to false on component unmount
    };
  }, []);
  const [toggle, setToggle] = useState(false);
  console.log(events, uni);
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
              {events.length == 0 ? (
                <h1>There are no events</h1>
              ) : (
                events.map((event, index) => (
                  <Cards key={index} event={event} uni={uni} club={club} />
                ))
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
