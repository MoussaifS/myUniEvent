import { getAuth,  signInWithPopup, OAuthProvider } from "firebase/auth";
import { useState, useRef } from "react";
import UserLogin from "../components/auth/UserLogin";
import { Typewriter } from "react-simple-typewriter";
import Nav from "../../../components/Nav";



import CreateUserForm from "../components/CreateUserForm";
const UserAuth = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((t) => !t);
  };
  return (
    <div id="auth-landing-Page"> 
      <Nav user={"user"}/>
      <div className="auth-body">
        <div className="auth-bannerText">
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
          <h1 className="auth-bannerText-purple">University Events</h1>
        </div>

        {toggle == false ? <UserLogin /> : <CreateUserForm />}
        <md-divider></md-divider>
        <md-filled-tonal-button onClick={handleToggle} id="button">
          {toggle == false ? "Create new account" : "I have account"}
        </md-filled-tonal-button>
      </div>
    </div>
  );
};

export default UserAuth;
