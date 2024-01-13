import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db , auth } from "../../../FireBase";
import Cookies from "universal-cookie";
import AdminCards from "../components/AdminCards";
import Filter from "../../../components/Filter";
import {Typography , Accordion, AccordionDetails, AccordionSummary } from "@mui/material";


const AdminCardContainer = (props) => {
  const [events, setEvents] = useState([]);
  const [admin , setAdmin] = useState(null)
  const cookies = new Cookies();
  const uid = cookies.get("a_id");
  const [state, setState] = useState(false);
  const [fetch, setFetch] = useState(false);

  const [expanded, setExpanded] = useState(false);


  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  


  console.log(admin)

  const fetchEventData = async () => {   
    try {
      var eventDataQuery = null
      if(admin.supervisor){
        eventDataQuery = await query(
          collection(db, "events"),
          where("adminUniID", "==", admin.universityID),
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
    setAdmin(props.admin)
    fetchEventData();
  }, [props.admin]);

  return (
    <div id="cards-container">
      <Filter />

      <div>
      <Accordion
        className="ddddd"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography level="h4" noWrap={false} variant="soft">
            Event analytics
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div id="filter-secondary-span">Attendance Metrics:</div>
            <div id="filter-Upcoming">dfdfdfdfdfdfdfdf</div>
          </div>
        </AccordionDetails>

        <AccordionDetails>
          <div id="filter-secondary-span">Tags:</div>
          <div id="card-horzintal-scroll">ererrererre</div>
        </AccordionDetails>
        <div>
          <span id="filter-btn">Download CSV Sheet</span>
        </div>
      </Accordion>
    </div>
          


        <div id="card-container">
          {events.length == 0 ? (
            <div id="noEvent">
              <span id="noEvent-span">No events found 😕</span>
              <p>To create a new event, please click the button below 🚀.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <AdminCards key={index} event={event}  />
            ))
          )}
        </div>
     
    </div>
  );
};

export default AdminCardContainer;
