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
import EventCarousel from "../components/EventCarousel"
import Cookies from "universal-cookie";
import Cards from "./Cards";
import Filter from "../../../components/Filter";
import { useSearchParams } from "react-router-dom";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';



const CardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [user, setUser] = useState();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state, setState] = useState(true);
  const [fetch, setFetch] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get("tag"));

  const fetchEventData = async () => {
    try {
      let eventDataQuery = null;
  
      if (searchParams.get("time")) {
        let time = searchParams.get("time");
        switch (time) {
          case "This Week": {
            const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
            const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  
            eventDataQuery = query(
              collection(db, "events"),
              where("startDate", ">=", startOfWeekDate),
              where("startDate", "<=", endOfWeekDate),
              orderBy("startDate", "asc")
            );
            break;
          }
  
          case "This Month": {
            const startOfMonthDate = startOfMonth(new Date());
            const endOfMonthDate = endOfMonth(new Date());
  
            eventDataQuery = query(
              collection(db, "events"),
              where("startDate", ">=", startOfMonthDate),
              where("startDate", "<=", endOfMonthDate),
              orderBy("startDate", "asc")
            );
            break;
          }
  
          default:
            eventDataQuery = query(
              collection(db, "events"),
              orderBy("startDate", "asc")
            );
        }
      } else if (searchParams.get("tag")) {
        console.log('sss');
        eventDataQuery = query(
          collection(db, "events"),
          where("tags", "array-contains", searchParams.get("tag")),
          orderBy("startDate", "asc")
        );
      } else if (props.varified) {
        eventDataQuery = query(
          collection(db, "events"),
          orderBy("approved", "asc")
        );
      } else {
        eventDataQuery = query(
          collection(db, "events"),
          orderBy("startDate", "asc")
        );
      }
  
      const eventInfoSnapshot = await getDocs(eventDataQuery);
      const eventsData = eventInfoSnapshot.docs.map((doc) => doc.data());
      setEvents(eventsData);
    } catch (error) {
      console.error("An error occurred while fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [searchParams]);

  return (
    <div id="cards-container">
    
    {!userEmail? null :  <EventCarousel/>  }
   
    
      {props.landing ? null : <Filter />}

      <div id="card-container">
        {events.length == 0 ? (
          <div id="noEvent">
            <span id="noEvent-span">No events found in the moment 😕</span>
            <p>Sign in to be updated 🚀.</p>
          </div>
        ) : (
          events.map((event, index) => (
            <Cards
              landing={props.landing}
              key={index}
              user={user}
              uni={uni}
              event={event}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CardContainer;
