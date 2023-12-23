import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db , auth } from "../../../FireBase";
import Cookies from "universal-cookie";
import AdminCards from "../components/AdminCards";
import Filter from "../../../components/Filter";

const AdminCardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [admin , setAdmin] = useState(null)
  const [uni, setUni] = useState("");
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state, setState] = useState(false);
  const [fetch, setFetch] = useState(false);

  

  useEffect(() => {
      setAdmin(props.admin)
  }, [props.admin]);

  const fetchEventData = async () => {
    try {
      const eventDataQuery = await query(
        collection(db, "events"),
        where("adminID", "==", auth.currentUser.uid),
      );
      const eventInfoSnapshot = await getDocs(eventDataQuery);
      console.log(eventInfoSnapshot)
      await setEvents(eventInfoSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };


  useEffect(() => {
    fetchEventData();
    return () => {
      setState({});
    };
  }, []);

  return (
    <div id="cards-container">
      <Filter />
      {state ? (
        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent-container">
              <span id="noEvent-span">No events found 😕</span>
              <p>To create a new event, please click the button below 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <AdminCards key={index} event={event} />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AdminCardContainer;
