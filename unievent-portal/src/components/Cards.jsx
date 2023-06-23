import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../assets/3c1aa898-cc8f-476c-ba1b-2ffff0a65461.jpeg";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ReactWhatsapp from "react-whatsapp";

import { Container } from "@mui/material";

const Cards = (props) => {
  const handleShare = () => {
    const message = `*Hey there!* %F0%9F%93%A2%0A%0AYou're invited to join the following event:%0A%0A%F0%9F%93%85+*Date:* ${encodeURIComponent(
      props.event.startDate
    )}%0A%F0%9F%95%B0+*Time:* ${encodeURIComponent(
      props.event.startTime
    )}%0A%F0%9F%8F%B3%EF%B8%8F+*Duration:* ${encodeURIComponent(
      parseInt(props.event.endTime) - parseInt(props.event.startTime)
    )} hours%0A%F0%9F%93%8D+*Location:* ${encodeURIComponent(
      props.uni
    )}%0A%0A%F0%9F%93%8C+*Event Details:*%0A*Name:* ${encodeURIComponent(
      props.event.name
    )}%0A*Description:* ${encodeURIComponent(
      props.event.description
    )}%0A*Tags:* ${encodeURIComponent(
      props.event.eventTag.map((tag) => tag.label).join(", ")
    )}%0A%0A%F0%9F%91%A5+*Organized by:* ${encodeURIComponent(
      props.club.length > 0 ? props.club : props.uni
    )}%0A%0AWe hope to see you there! %F0%9F%98%84`;

    // Use encodeURIComponent(message) when passing the message to the WhatsApp invitation function or component.

    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container sx={{ marginBottom: "10px" }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.event.name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {props.event.description}
          </Typography>
          <br />
          <Box sx={{ display: "inlineBlock" }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {props.event.eventTag.map((tag, index) => (
                <Box key={index} display={{ xs: "block", sm: "inline" }}>
                  <Chip label={tag.label} variant="outlined" />
                </Box>
              ))}
            </Stack>
            <br />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Chip label={props.event.eventInvitation.label} />
            </Stack>
          </Box>

          <br />

          <Typography variant="body2" color="text.secondary">
            <strong>Date:</strong> {props.event.startDate}
            <br />
            <strong>Time:</strong> {props.event.startTime}
            <br />
            <strong>Duration:</strong>{" "}
            {parseInt(props.event.endTime) - parseInt(props.event.startTime)}{" "}
            hours
            <br />
            <strong>Location:</strong> {props.uni}
            <br />
            {console.log(props.club)}
            <strong>Organized by:</strong>{" "}
            {props.club.length > 0 ? props.club : props.uni}
            <br />
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-start" }}>
          <Button size="small">Delete</Button>
          <Button size="small" onClick={handleShare}>
            Share
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Cards;
