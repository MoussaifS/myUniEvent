import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db  } from "../../../FireBase";
import Cookies from "universal-cookie";
import AdminCards from "../components/AdminCards";
import Filter from "../../../components/Filter";


const AdminCardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [admin , setAdmin] = useState(null)
  const [fetch, setFetch] = useState(false);
  const cookies = new Cookies();
  const uid = cookies.get("a_id");

  const fetchEventData = async () => {   
    try {
      var eventDataQuery = null
      if(admin.supervisor){
        eventDataQuery = await query(
          collection(db, "events"),
          where("adminUniID", "==", admin.universityID),
          orderBy("startDate", "asc")
        );
      }else{
        eventDataQuery = await query(
          collection(db, "events"),
          where("adminID", "==", uid),
          orderBy("startDate", "asc")
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
    setAdmin(props.admin)
  }, []);

  return (
    <div id="cards-container">
        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent">
              <span id="noEvent-span">No events found 😕</span>
              <p>To create a new event, please click the button below 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <AdminCards key={index} event={event} admin={admin} />
            ))
          )}
        </div>
     
    </div>
  );
};

export default AdminCardContainer;
