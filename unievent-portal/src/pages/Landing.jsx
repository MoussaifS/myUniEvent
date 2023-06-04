import * as React from "react";
import { Container, TextField, Grid, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Login from "../components/Login";
const Landing = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Login/>
      </Grid>
      <Grid item xs={6}>
        
      </Grid>
    </Grid>
  );
};

export default Landing;
