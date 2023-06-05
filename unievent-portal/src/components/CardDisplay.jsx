import {
    Container,
    TextField,
    Grid,
    Button,
  } from "@mui/material";
  import Select from "react-select";
  import PublishIcon from "@mui/icons-material/Publish";
  import SendSharpIcon from "@mui/icons-material/SendSharp";
  import { useForm, Controller } from "react-hook-form";
  import EventCard from "./EventCard";
  const CardDisplay = () => {
    
    const onSubmit = (data) => {
      console.log(data); // Do something with the form data
    };
  
    return (
      <Container maxWidth="sm" id="form-container">
        <EventCard/>
      </Container>
    );
  };
  
  export default CardDisplay;
  