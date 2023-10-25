import { Box, Container, Paper } from "@mui/material";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Nav from "../components/Nav";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

const Landing = () => {
  const luck = ["Sharing", "Managing", "Elevating", "Hosting", "Promoting"];

  const [bannerText, setBannerText] = useState();

  useEffect(() => {
    setInterval(() => {
      setBannerText(luck[Math.floor(Math.random() * 5)]);
    }, 1000);
  }, []);

  const bannerMotion = {
    transition: {
      duration: 1,
      ease: [0.5, 0.71, 1, 1.01],
    },
  };

  console.log(bannerText);

  return (
    <div id="landingPage">
      <Nav />
      <Container maxWidth="lg" id="main-container" sx={{ hight: "100%" }}>
        <Container maxWidth="lg">
          <p className="banerText">
            <h1 className="purple">University Event</h1>
            <motion.span {...bannerMotion}>
              <h1>{bannerText}</h1>
            </motion.span>
            <span> made easy for</span> <span className="purple"> FREE </span>
          </p>
          <p id="landing-desc-desktop">
            <b> Create, Manage, Share, and Promote </b>
            events with our <span>UniEvent</span> platform. And explore more
            events
          </p>
        </Container>

        <Paper
          elevation={3}
          variant="outlined"
          className="paper-landing"
          sx={{
            marginBottom: "20px",
            paddingBottom: "0px",
            border: "0px",
            padding: "0px 15px 0px 15px",
          }}
        >
          <SignUp />
          <Login />

          <Box sx={{ height: "10px", textAlign: "center", paddingx: "0px" }}>
            <b>OR</b>
          </Box>

          <button className="filledButton">Create new account</button>
        </Paper>
        <p id="landing-desc-mobile">
          <b> Create, Manage, Share, and Promote </b>
          events with our <span>UniEvent</span> platform. And explore more
          events
        </p>
      </Container>
    </div>
  );
};

export default Landing;
