import Cookies from "universal-cookie";
import { db } from "../../../FireBase";
import {
    Typography ,Card 
  } from "@mui/material";
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  getDoc,
  orderBy,
  documentId,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link  ,useLocation , useNavigate } from "react-router-dom";


const EventCarousel = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const cookies = new Cookies();
  const [events, setEvents] = useState([]);
  const uid = cookies.get("uid");
  const [user, setUser] = useState(null);
  const [fetch, setFetch] = useState(false);

  const festchUserData = async () => {
    try {
      console.log(uid);
      const docRef = doc(db, "users", uid);
      await getDoc(docRef).then((docSnapshot) => {
        setUser(docSnapshot.data());
      });

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    festchUserData();
  }, [uid]);

  const fetchEventData = async () => {
    try {
      let eventDataQuery = query(
        collection(db, "events"),
        where("tags", "array-contains-any", user.preferredEvent),
        orderBy("startDate", "asc")
      );

      const eventInfoSnapshot = await getDocs(eventDataQuery);
      const eventsData = eventInfoSnapshot.docs.map((doc) => doc.data());
      setEvents(eventsData);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchEventData();
    }
  }, [user]);
  
  const handleRedirctEvent = (id) => {
    navigate(`/event/${encodeURIComponent(id)}`, {  state: { from: location } });
    <Link to={`/event/${encodeURIComponent(id)}`} />
  }

  return (
<div id="eventCarousel">
    {events.map((event, index) => (
    <Card className="fd-r" id="cardCarouse" color="neutral" key={index} variant="outlined"  onClick={()=>handleRedirctEvent(event.docId)}  >
            <div className="fd-r" key={index}>
         
                <img loading="lazy" src={event.image} width={120} />

              <div id="attending-card-details">
                <p className="card-helper-text">
                  {event.title}
                </p>

                <p id="card-tags">
                  {format(new Date(event.startDate), "iii, LLL d")} •{" "}
                  {event.startTime}
                </p>
              </div>
            </div>
    </Card>
    ))}


    

    


  </div>

  
  );
};

export default EventCarousel;
