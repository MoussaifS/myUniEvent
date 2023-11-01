import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Form from "../components/Form";
import { db } from "../FireBase";
// import Cards from "../components/Cards";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "universal-cookie";
import "@material/web/dialog/dialog.js";
import "@material/web/button/outlined-button.js";
import "@material/web/fab/fab.js";
import "@material/web/icon/icon.js";
import "@material/web/ripple/ripple.js";

const DashBoard = () => {
  const [events, setEvents] = useState({});
  const [uni, setUni] = useState("");
  const [user, setUser] = useState({});
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  
  const fetchUserInfo = async function () {
    const userInfoQuery = await query(
      collection(db, "organizers"),
      where("email", "==", userEmail)
    );
    const userInfoSnapshot = await getDocs(userInfoQuery);
    //refactore this shit asap
    const userDataArray = await userInfoSnapshot.docs[0].data();
    await setUser(userDataArray);
    await setUni(userDataArray.institution)
  };

  const fetchDataByUni = async function () {
  
    const eventDataQuery = await query(
      collection(db, "events"),
      where("email", "==", userEmail)
    );
    const eventInfoSnapshot = await getDocs(eventDataQuery);
    const eventList = await eventInfoSnapshot.docs.map((doc) => doc.data());
    await setEvents(eventList)
        // uniSnapshot.forEach((doc) => {
        //   setUni(doc.data().institution.label);
        //   setClub(doc.data().clubName);
        //   const cookies = new Cookies();
        //   cookies.set("userName", doc.data().lastName, { path: "/" });
        // });
  };

  //duck explain
  useEffect(() => {
    fetchUserInfo();
    fetchDataByUni();
  
  }, []);


    console.log(events)

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

      <div>
        {events.length < 0 ? (
          <h1>there is no event</h1>
        ) : (
            events.map((event) => {
              <p>event</p>
            }))
        }
      </div>
    </div>
  );
};

export default DashBoard;
