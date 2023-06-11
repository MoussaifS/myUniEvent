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
  import Cards from "./Cards"
  import {data} from "../FireBase"
  const CardDisplay = () => {
    


    console.log(data)
  
    return (
      <Container maxWidth="sm" id="form-container">
        <Cards/>
        <EventCard/>
      </Container>
    );
  };
  
  export default CardDisplay;
  