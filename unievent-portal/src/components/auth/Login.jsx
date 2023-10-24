import {TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { collection, query, where } from "firebase/firestore";
import { useState } from "react";
import { deepPurple } from "@mui/material/colors";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(deepPurple)

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
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email */}
          <TextField
            placeholder="Email"
            variant="outlined"
            label="Enter Your Email"
            margin="normal"
            required
            fullWidth
            {...register("email")}
          />
          {/* Password */}
          <TextField
            placeholder="Password"
            variant="outlined"
            label="Enter Your Password"
            type="password"
            margin="normal"
            required
            fullWidth
            {...register("password")}
          />
        </div>
        <button className="elevatedButton">Log in</button>
      </form>

      
    </div>
  );
};

export default Login;
