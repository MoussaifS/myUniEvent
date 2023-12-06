import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const { handleSubmit, register } = useForm();
  const onSubmit = (e) => {
    console.log('in')
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => {
        console.log('in the in')
        const cookies = new Cookies();
        cookies.set("email", e.email, { path: "/" });
        console.log(cookies)
        navigate("admin/dashboard", { replace: true, state: { from: location } });
        console.log('here')
      })
      .catch(() => {
        console.log('in the out')
        setError(true);
      });
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email */}
          <md-outlined-text-field
            id="text-field-credentials"
            {...register("email")}
            type="email"
            required
            label="Enter Your Email"
            autocomplete="email"
          ></md-outlined-text-field>

          {/* Password */}
          <md-outlined-text-field
            id="text-field-credentials"
            {...register("password")}
            required
            type="password"
            placeholder="Password"
            label="Enter Your Password"
            autocomplete="current-password"
          ></md-outlined-text-field>
          <div>{error ?  <div id="error-email-password">Wrong Email Address or Password</div> : null}</div>
        </div>

        <md-outlined-button id="button"> Log In </md-outlined-button>
      </form>
    </div>
  );
};

export default Login;
