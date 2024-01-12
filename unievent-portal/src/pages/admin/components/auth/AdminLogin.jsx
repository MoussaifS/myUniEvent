import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import { TextField } from "@mui/material";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);
  const { handleSubmit, register } = useForm();
  
  const onSubmit = (e) => {
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => {
        const cookies = new Cookies();
        cookies.set("a_email", e.email, { path: "/" });
        cookies.set("a_id", auth.currentUser.uid, { path: "/" });
        navigate("/admin/dashboard", { replace: true, state: { from: location } });
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div id="textField">
            {/* Email */}
            <TextField
              {...register("email")}
              type="email"
              required
              label="Enter Your Email"
              margin="normal"
              fullWidth
              placeholder="Email@domain.edu"
              autocomplete="email"
            ></TextField>
          </div>

          {/* Password */}
          <TextField
            {...register("password")}
            required
            margin="normal"
            type="password"
            placeholder="Password"
            label="Enter Your Password"
            autocomplete="current-password"
            fullWidth
          ></TextField>
          <div>
            {error ? (
              <div className="form-helper-text-error">
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

export default AdminLogin;
