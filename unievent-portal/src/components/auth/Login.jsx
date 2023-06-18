import { Container  , TextField, Grid, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase";
import {useLocation, useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { handleSubmit, register } = useForm();
  const onSubmit = (e) => {
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then((userCredential) => {
        console.log(userCredential);
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
            <Button
              fullWidth
              id="btn-login"
              type="submit"
              variant="contained"
              endIcon={<LoginIcon />}
              color="primary"
            >
              Log In
            </Button>
          </Grid>


        </Grid>
      </form>
    </Container>
  );
};

export default Login;
