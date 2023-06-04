import * as React from "react";
import pic from "../assets/image1-removebg.png";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const Landing = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={8}>
      <Grid item xs={6}>
      <Container maxWidth="sm" id="landing-prom">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
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
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
      </Container>
    </Grid>



        <Grid item xs={6}>
          <Container maxWidth="sm" id="landing-form">
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <SignUp />
              
            </Box>
          </Container>
        </Grid>

      </Grid>
    </Container>
  );
};


export default Landing;
