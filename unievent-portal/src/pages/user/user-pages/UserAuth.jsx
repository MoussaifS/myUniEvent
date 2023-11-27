import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { useState, useRef } from "react";
import Login from "../../../components/auth/Login";
import SignUp from "../components/SignUp"
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
    <div id="UserAuth-landing-input">
      {toggle == false ? <Login /> : <SignUp />}
      <md-divider></md-divider>
      <md-filled-tonal-button onClick={handleToggle} id="button">
        {" "}
        {toggle == false ? "Create new account" : "I have account"}{" "}
      </md-filled-tonal-button>
    </div>

    </div>
  );
};

export default UserAuth;
