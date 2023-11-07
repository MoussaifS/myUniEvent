import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Form from "../components/Form";
import { db } from "../FireBase";
import Cards from "../components/Cards";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Cookies from "universal-cookie";
import "@material/web/dialog/dialog.js";
import "@material/web/button/outlined-button.js";
import "@material/web/fab/fab.js";

import "@material/web/fab/branded-fab.js";


import "@material/web/icon/icon.js";
import "@material/web/ripple/ripple.js";
import { Flag } from "@mui/icons-material";
import shareIcon from "../assets/share_icon.svg";

const DashBoard = () => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [user, setUser] = useState();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state, setState] = useState(false);

  //duck explain
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDataQuery = await query(
          collection(db, "events"),
          where("email", "==", userEmail),
          orderBy("startDate", "asc") // Add this line to order events by startDate in ascending order.
        );
        const eventInfoSnapshot = await getDocs(eventDataQuery);

        await setEvents(eventInfoSnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };
    fetchEventData();

    const fetchUserInfo = async () => {
      try {
        const userInfoQuery = await query(
          collection(db, "organizers"),
          where("email", "==", userEmail)
        );
        const userInfoSnapshot = await getDocs(userInfoQuery);
        const userDataArray = await userInfoSnapshot.docs[0].data();
        await setUser(userDataArray);
        await setUni(userDataArray.institution);
        setState(true);
      } catch (error) {
        setState(false);
        console.log("eat a dick and have this", error);
      }
    };
    fetchUserInfo();
  }, []);

  const inputRef = useRef(null);

  function handleOpenFormClick() {
    inputRef.current.show();
  }

  function handleCloseFormClick() {
    inputRef.current.close();
  }

  return (
    <div className="fd-c">
      <Nav />
      <md-branded-fab label="Add New Event" id="createNewEvent-btn" onClick={handleOpenFormClick}>
      <svg slot="icon" viewBox="0 0 35 35">
        <path fill="#6750a4" d="M16 16v14h4V20z"></path>
        <path fill="#6750a4" d="M30 16H20l-4 4h14z"></path>
        <path fill="#6750a4" d="M6 16v4h10l4-4z"></path>
        <path fill="#6750a4" d="M20 16V6h-4v14z"></path>
        <path fill="none" d="M0 0h36v36H0z"></path>
      </svg>
    </md-branded-fab>
       

      <md-dialog ref={inputRef}>
        <div className="fd-c" slot="content" method="dialog">
          <Form />
          <md-outlined-button onClick={handleCloseFormClick}>
            close
          </md-outlined-button>
        </div>
      </md-dialog>

      {state ? (
        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent-container">
              <span id="noEvent-span">No events found 😕</span>
              <p>To create a new event, please click the button below 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <Cards key={index} user={user} uni={uni} event={event} />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default DashBoard;
