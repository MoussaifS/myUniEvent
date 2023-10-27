import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { collection, query, where } from "firebase/firestore";
import { useState } from "react";





const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setName] = useState("");

  async function fetchDataByEmail(email) {
    const uniRef = collection(db, "organizers");
    const uniQuery = query(uniRef, where("email", "==", email.toLowerCase()));
  }

  const { handleSubmit, register } = useForm();
  const onSubmit = (e) => {
    
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then((userCredential) => {
        const cookies = new Cookies();
        cookies.set("email", e.email, { path: "/" });
        fetchDataByEmail(e.email);
        navigate("/dashboard", { replace: true, state: { from: location } });
      })
      .catch((error) => console.log(error));

    console.log(e); // duck >
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email */}
          <md-outlined-text-field  id="text-field-credentials" {...register("email")} required label="Enter Your Email" >
          </md-outlined-text-field>

          {/* Password */}
          <md-outlined-text-field id="text-field-credentials" {...register("password")} required  type="password" placeholder="Password" label="Enter Your Password" >
          </md-outlined-text-field>
        </div>
        <md-outlined-button id="button"> Log in </md-outlined-button>
      </form>
    </div>
  );
};

export default Login;
