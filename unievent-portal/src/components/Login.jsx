import React from "react";
import { Container, TextField, Grid, Button } from "@mui/material";
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
              id="btn-publish"
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
