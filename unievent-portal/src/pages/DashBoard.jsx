import { useState, useEffect } from "react";
import pic from "../assets/image1-removebg.png";
import Nav from "../components/Nav";
import Form from "../components/Form";
import { db } from "../FireBase";
import Cards from "../components/Cards";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "universal-cookie";
import "@material/web/fab/fab.js";
import "@material/web/icon/icon.js";
import "@material/web/ripple/ripple.js";

const DashBoard = () => {
  const [events, setEvents] = useState([]);
  const [uni, setUni] = useState("");
  const [club, setClub] = useState("");
  const [userName, setName] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchDataByEmail() {
      const eventsRef = collection(db, "events");
      const uniRef = collection(db, "organizers");
      const cookies = new Cookies();
      const currentUserEmail = cookies.get("email");

      const eventsQuery = query(
        eventsRef,
        where("email", "==", currentUserEmail.toLowerCase())
      );

      const uniQuery = query(
        uniRef,
        where("email", "==", currentUserEmail.toLowerCase())
      );

      try {
        const eventsSnapshot = await getDocs(eventsQuery);
        const uniSnapshot = await getDocs(uniQuery);

        if (isMounted) {
          const updatedEvents = eventsSnapshot.docs.map((doc) => doc.data());
          setEvents(updatedEvents);

          uniSnapshot.forEach((doc) => {
            setUni(doc.data().institution.label);
            setClub(doc.data().clubName);
            const cookies = new Cookies();
            cookies.set("userName", doc.data().lastName, { path: "/" });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchDataByEmail();

    return () => {
      isMounted = false; // Set flag to false on component unmount
    };
  }, []);
  const [toggle, setToggle] = useState(false);
  console.log(events, uni);


  return (
    <div>
      <Nav userName={userName} />

      <Form/>

      <div>
        <md-ripple>
          <md-fab size="large" aria-label="Edit" label="Create new event">
            <md-icon>+</md-icon>
          </md-fab>
        </md-ripple>
      </div>

      <div>
        {events.length == 0 ? (
          <h1>There are no events</h1>
        ) : (
          events.map((event, index) => (
            <Cards key={index} event={event} uni={uni} club={club} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashBoard;
