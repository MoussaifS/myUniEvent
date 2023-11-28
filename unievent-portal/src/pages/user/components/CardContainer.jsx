import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../FireBase";

import Cookies from "universal-cookie";
import Cards from "./Cards";
import Filter from "../../../components/Filter";

const CardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [user, setUser] = useState();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state, setState] = useState(false);
  const [fetch, setFetch] = useState(false);

  console.log(props)


  const fetchEventData = async () => {
    try {
      const eventDataQuery = await query(
        collection(db, "events"), 
        orderBy("startDate", "asc") // Add this line to order events by startDate in ascending order.
      );
      const eventInfoSnapshot = await getDocs(eventDataQuery);

      await setEvents(eventInfoSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.log("eat a fat dick and fix it:", error);
    }
  };

  

  useEffect(() => {
    fetchEventData();

  }, []);

  return (
    <div id="cards-container">
      {props.landing ?  null : <Filter />}
      {state ? (
        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent">
              <span id="noEvent-span">No events found in the moment 😕</span>
              <p>Sign in to be updated 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <Cards landing={props.landing} key={index} user={user} uni={uni} event={event} />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CardContainer;
