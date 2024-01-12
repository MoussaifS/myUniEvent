import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import { Link  ,useLocation , useNavigate } from "react-router-dom";

import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";
import { format } from "date-fns";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../FireBase";
import Cookies from "universal-cookie";

const AttendingHistory = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const uid = cookies.get("uid");

  const fetchEventData = async () => {
    try {
      let eventDataQuery = query(
        collection(db, `users/${uid}/events`),
        orderBy("startDate", "asc")
      );
      const eventInfoSnapshot = await getDocs(eventDataQuery);
      const eventsData = eventInfoSnapshot.docs.map((doc) => doc.data());
      setEvents(eventsData);
    } catch (error) {
      console.log(events);
      console.log("eat a fat dick and fix it:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleRedirctEvent = (id) => {
    navigate(`/event/${encodeURIComponent(id)}`, {  state: { from: location } });
    <Link to={`/event/${encodeURIComponent(id)}`} />
  }



  return (
    <div>
      {uid ? (
        events.map((event, index) => (
          <Card className="fd-r" color="neutral" key={index} variant="outlined"  onClick={()=>handleRedirctEvent(event.id)}  >
            <div className="fd-r" key={index}>
         
              <AspectRatio sx={{ width: 150 }}>
                <img loading="lazy" src={event.image} width={150} />
              </AspectRatio>
              <div id="attending-card-details">
                <Typography level="h4" noWrap={false} variant="soft">
                  this is the title{" "}
                </Typography>

                <Typography level="title-sm" noWrap={false} variant="outlined">
                  {format(new Date(event.startDate), "iii, LLL d")} •{" "}
                  {event.startTime}
                </Typography>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div> log in </div>
      )}
    </div>
  );
};

export default AttendingHistory;
