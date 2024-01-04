import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../FireBase";

import Cookies from "universal-cookie";
import Cards from "./Cards";
import Filter from "../../../components/Filter";
import { useSearchParams } from 'react-router-dom';

const CardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [user, setUser] = useState();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state, setState] = useState(true);
  const [fetch, setFetch] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams); 

  const fetchEventData = async () => {




    try {
      let eventDataQuery = null

      
        if(eventDataQuery){
          eventDataQuery = query(
              collection(db, "events"),
              where("tags", "array-contains",test),
              orderBy("startDate", "asc"),
          );

        }else{
          eventDataQuery = query(
              collection(db, "events"),
              orderBy("startDate", "asc"),
          );
        }




      const eventInfoSnapshot = await getDocs(eventDataQuery);
      const eventsData = eventInfoSnapshot.docs.map((doc) => doc.data());
      setEvents(eventsData);
    } catch (error) {
      console.log("eat a fat dick and fix it:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <div id="cards-container">
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
