import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { TextField } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const { handleSubmit, register } = useForm();
  const onSubmit = (e) => {
    console.log("in");
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => {
        console.log("in the in");
        const cookies = new Cookies();
        cookies.set("email", e.email, { path: "/" });
        console.log(cookies);
        navigate("/dashboard", { replace: true, state: { from: location } });
        console.log("here");
      })
      .catch(() => {
        console.log("in the out");
        setError(true);
      });
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email */}
          <TextField
            id="text-field-credentials"
            {...register("email")}
            type="email"
            required
            label="Enter Your Email"
            margin="dense"
            fullWidth
            placeholder="Email@domain.edu"
            autocomplete="email"
          ></TextField>

          {/* Password */}
          <TextField
            id="text-field-credentials"
            {...register("password")}
            required
            type="password"
            placeholder="Password"
            label="Enter Your Password"
            autocomplete="current-password"
            fullWidth
            
            ></TextField>
          <div>
            {error ? (
              <div id="error-email-password">
                Wrong Email Address or Password
              </div>
            ) : null}
          </div>
        </div>

        <md-outlined-button id="button"> Log In </md-outlined-button>
      </form>
    </div>
  );
};

export default Login;
