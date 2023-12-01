import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { useState, useRef } from "react";
import Login from "../../../components/auth/Login";
import { Typewriter } from "react-simple-typewriter";

import SignUpUserForm from "../components/SignUpUserForm";
const UserAuth = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((t) => !t);
  };

  // const auth = getAuth();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // User is signed in.
  //     // IdP data available in result.additionalUserInfo.profile.

  //     // Get the OAuth access token and ID Token
  //     const credential = OAuthProvider.credentialFromResult(result);
  //     const accessToken = credential.accessToken;
  //     const idToken = credential.idToken;
  //   })
  //   .catch((error) => {
  //     // Handle error.
  //   });
  return (
    <div id="UserAuth-landing">


     


      <div >

      <div className="banerText-user">
      <span>Login or Sign up to</span>
      <br></br>
      <Typewriter
          words={[
            "Attend",
            "Save",
            "Follow",
          ]}
          cursor
          loop={Infinity}
          cursorColor="#6750a4"
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={70}
          delaySpeed={2000}
        />

        <h1 className="purple">University Events</h1>
            
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
