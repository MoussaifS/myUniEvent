import { Box, Container, Paper } from "@mui/material";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/divider/divider.js";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";

import Nav from "../components/Nav";
const MainLandingPage = () => {
  return (
    <div>
      <Nav />
      <Container maxWidth="lg" id="main-container" sx={{ height: "100%" }}>
        <Container maxWidth="lg" sx={{ height: "100px", margin: "10px" }}>
          <div className="banerText">
            <div>
              <Typewriter
                words={[
                  "Discovering",
                  "Sharing",
                  "Attending",
                  "Hosting",
                  "Promoting",
                ]}
                cursor
                loop={Infinity}
                cursorColor="#6750a4"
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={70}
                delaySpeed={2500}
              />
            </div>

            <span className="purple">University Events</span>
            <span> Made Easy with </span>
            <span className="purple">✨ UniEvent ✨ </span>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default MainLandingPage;
