import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db  } from "../../../FireBase";
import Cookies from "universal-cookie";
import AdminCards from "../components/AdminCards";
import Filter from "../../../components/Filter";


const AdminCardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [admin , setAdmin] = useState(null)
  const cookies = new Cookies();
  const uid = cookies.get("a_id");
  const [fetch, setFetch] = useState(false);

  const fetchEventData = async (a) => {  
    try {
      var eventDataQuery = null
      if(a.supervisor){
        eventDataQuery = await query(
          collection(db, "events"),
          where("adminUniID", "==", a.universityID),
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
      await setEvents(eventInfoSnapshot.docs.map((doc) =>doc.data())  );
      setFetch(true)
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    setAdmin(props.admin)
    fetchEventData(admin);
  }, [props.admin , fetch]);

  return (
    <div id="cards-container">
        <div id="card-container">
          { !fetch ? (
            <div id="noEvent">
              <span id="noEvent-span">No events found 😕</span>
              <p>To create a new event, please click the button below 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <AdminCards key={index} event={event} admin={admin}  setFetch={setFetch} />
            ))
          )}
        </div>
     
    </div>
  );
};

export default AdminCardContainer;
