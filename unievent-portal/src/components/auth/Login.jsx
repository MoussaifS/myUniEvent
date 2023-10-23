import { Container, TextField, Grid, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

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

    console.log(e); // Do something with the form data
  };

  return (
    <Container maxWidth="sm" id="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              placeholder="Email"
              variant="filled"
              label="Enter Your Email"
              required
              fullWidth
              {...register("email")}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              placeholder="Password"
              variant="filled"
              label="Enter Your Password"
              type="password"
              required
              fullWidth
              {...register("password")}
            />
          </Grid>

          <Grid item xs={12}>
            <button className="elevatedButton" >Log in</button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
