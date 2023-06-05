import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const EventCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Event Title
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Event Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: September 15, 2023
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time: 8:00 PM - 10:00 PM
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: 2 hours
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Event Type: Conference
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image="https://example.com/event-pic.jpg" // Replace with your event picture URL
        alt="Event Picture"
      />
    </Card>
  );
};

export default EventCard;
