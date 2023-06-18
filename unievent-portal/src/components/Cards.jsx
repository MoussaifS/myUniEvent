import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from '../assets/3c1aa898-cc8f-476c-ba1b-2ffff0a65461.jpeg';

import { Container } from "@mui/material";

const Cards = () => {
  
  return (
    <Container>
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          sx={{ width: 500, height: 450 }}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            the event title
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>

          <Typography variant="body2" color="text.secondary">
            date: 2023-06-22 time: 22:37 
            durtion: {1} hours
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">Delete</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Cards;
