import { Box, Container, Paper } from "@mui/material";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/divider/divider.js";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";
import "@material/web/button/filled-button.js";
import Nav from "../components/Nav";
import CardContainer from "./user-pages/CardContainer";
import { Divider } from "antd";
const MainLandingPage = () => {
  return (
    <div className="fd-c">
      <Nav />
      <Container maxWidth="lg" id="main-container" sx={{ height: "100%" }}>
        <div>
          <div className="banerText">
            <div>
              <Typewriter
                words={["Discovering", "Sharing", "Attending", "Hosting"]}
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
        </div>
      </Container>
      <div id="landing-bannar">
        <p id="landing-text-bannar">
          <a id="landing-btn">
            {" "}
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 30 30"
            >
              <path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"></path>
            </svg>
          </a>{" "}
          Events, Meetups, Skill-sharing opportunities within the Academic
          sphere.
        </p>
        <img src="/dist/assets/event.jpg" id="landing-image"></img>
      </div>

      <div id="landing-bannar">
      <img src="/dist/assets/product-school-nOvIa_x_tfo-unsplash.jpg" id="landing-image"></img>
        <p id="landing-text-bannar">
          <a id="landing-btn">
            {" "}
            Create
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 30 30"
            >
              <path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"></path>
            </svg>
          </a>{" "}
          and Share your upcoming events with us
        </p>
      </div>

        <Divider/>
        <span >Event for this month</span>
      <CardContainer/>
    </div>
  );
};

export default MainLandingPage;
