import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Form from "../components/Form";
import { db } from "../FireBase";
import Cards from "../components/Cards";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "universal-cookie";
import "@material/web/dialog/dialog.js";
import "@material/web/button/outlined-button.js";
import "@material/web/fab/fab.js";
import "@material/web/icon/icon.js";
import "@material/web/ripple/ripple.js";
import { Flag } from "@mui/icons-material";

const DashBoard = () => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [user, setUser] = useState();
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const [state , setState] = useState(false)


  //duck explain
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDataQuery = await query(
          collection(db, "events"),
          where("email", "==", userEmail)
        );
        const eventInfoSnapshot = await getDocs(eventDataQuery);
        await setEvents(eventInfoSnapshot.docs.map((doc) => doc.data())); 
      } catch (error) {
        console.log("eat a shit and have this ", error);
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
        await setUni(userDataArray.institution)
        setState(true)
      } catch (error) {
        setState(false)
        console.log("eat a dick and have this" , error);
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
      <Nav className="mb-25"/>
      <md-fab
        id="createNewEvent-btn"
        size="large"
        aria-label="Edit"
        label="Add Event to Calender"
        name="did"
        onClick={handleOpenFormClick}
      >
        <md-icon>+</md-icon>
      </md-fab>

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
            <div id="noEvent-container" >
            <span id="noEvent-span">No events found  😕</span>
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
