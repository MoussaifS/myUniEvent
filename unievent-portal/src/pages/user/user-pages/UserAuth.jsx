import { getAuth,  signInWithPopup, OAuthProvider } from "firebase/auth";
import { useState, useRef } from "react";
import Login from "../../../components/auth/Login";
import { Typewriter } from "react-simple-typewriter";
import Nav from "../../../components/Nav";
import { Container } from "@mui/material";



import SignUpUserForm from "../components/SignUpUserForm";
const UserAuth = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((t) => !t);
  };
  return (
    <Container maxWidth="md"> 
    <Nav/>
      <div id="UserAuth-landing">
        <div className="userAuth-banerText">
          <span>Login or Sign up to</span>
          <br></br>
          <Typewriter
            words={["Attend", "Save", "Follow"]}
            cursor
            loop={Infinity}
            cursorColor="#6750a4"
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={70}
            delaySpeed={9000}
          />
          <h1 className="purple">University Events</h1>
        </div>

        {toggle == false ? <Login /> : <SignUpUserForm />}
        <md-divider></md-divider>
        <md-filled-tonal-button onClick={handleToggle} id="button">
          {toggle == false ? "Create new account" : "I have account"}
        </md-filled-tonal-button>
      </div>
    </Container>
  );
};

export default UserAuth;
