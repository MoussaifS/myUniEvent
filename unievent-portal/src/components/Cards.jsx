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
    const message = encodeURIComponent("Hello! This is my preset message.");
    const whatsappUrl = `whatsapp://send?text=${message}`;

    window.location.href = whatsappUrl;
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
