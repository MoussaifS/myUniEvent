import React from "react";
import { Container, TextField, Grid, Button, Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";

const Login = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Do something with the form data
  };

  return (
    <Container maxWidth="sm" id="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              placeholder="Email"
              variant="filled"
              label="enter your email"
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
              label="enter your password"
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

        <Divider>Or Sign In With</Divider>
        <Button
          variant="contained"
          color="primary"
        >
          Sign In with Microsoft
        </Button>
      </form>
    </Container>
  );
};

export default Login;
