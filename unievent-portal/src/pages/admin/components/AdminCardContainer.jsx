import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db , auth } from "../../../FireBase";
import Cookies from "universal-cookie";
import AdminCards from "../components/AdminCards";
import Filter from "../../../components/Filter";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const AdminCardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [admin , setAdmin] = useState(null)
  const cookies = new Cookies();
  const userEmail = cookies.get("a-email");
  const uid = cookies.get("a_id");
  const [state, setState] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
      setAdmin(props.admin)
  }, [props.admin]);


  const fetchEventData = async () => {
    try {
      var eventDataQuery = null
      if(false){
        eventDataQuery = await query(
          collection(db, "events"),
          where("universityID", "==", admin.universityID),
        );
      }else{
        eventDataQuery = await query(
          collection(db, "events"),
          where("adminID", "==", uid),
        );
      }
    
      const eventInfoSnapshot = await getDocs(eventDataQuery);
      console.log(eventInfoSnapshot)
      await setEvents(eventInfoSnapshot.docs.map((doc) =>doc.data())  );
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <div id="cards-container">
      <Filter />
      
        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent">
              <span id="noEvent-span">No events found 😕</span>
              <p>To create a new event, please click the button below 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <AdminCards key={index} event={event} />
            ))
          )}
        </div>
     
    </div>
  );
};

export default AdminCardContainer;
