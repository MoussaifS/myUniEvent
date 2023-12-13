import { getAuth,  signInWithPopup, OAuthProvider } from "firebase/auth";
import { useState, useRef } from "react";
import Login from "../../../components/auth/Login";
import { Typewriter } from "react-simple-typewriter";
import Nav from "../../../components/Nav";



import SignUpUserForm from "../components/SignUpUserForm";
const UserAuth = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((t) => !t);
  };
  return (
    <div id="userAuth-landing-Page"> 
      <Nav user={"user"}/>
      <div className="userAuth-landing-body">
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
          <h1 className="userAuth-banerText-purple">University Events</h1>
        </div>

        {toggle == false ? <Login /> : <SignUpUserForm />}
        <md-divider></md-divider>
        <md-filled-tonal-button onClick={handleToggle} id="button">
          {toggle == false ? "Create new account" : "I have account"}
        </md-filled-tonal-button>
      </div>
    </div>
  );
};

export default UserAuth;
