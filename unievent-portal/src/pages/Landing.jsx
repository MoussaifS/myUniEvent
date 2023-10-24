import { Box, Container, Paper } from "@mui/material";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Nav from "../components/Nav";

const Landing = () => {
  return (
    <div id="landingPage">
      <Nav />
      <Container maxWidth="lg" id="main-container" sx={{ hight: "100%" }}>
        <Container maxWidth="lg">
          <p className="banerText">
            <h1 className="purple">University Events</h1>
            <span>hosting made easy</span>{" "}
            <span> for FREE with</span> <span className="purple">UniEvent</span>
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
