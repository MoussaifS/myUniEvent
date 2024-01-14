import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

import { db } from "../../../FireBase";

const EventAnalytics = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [audience, setAudience] = useState([]);
  const docId = props.docId;
  let gender = [];
  let attending = 0;
  let university = []


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchAudienceData = async (a) => {
    try {
      const audienceDataQuery = await query(
        collection(db, `events/${docId}/attendees`),
        orderBy("name", "asc")
      );
      const audienceInfoSnapshot = await getDocs(audienceDataQuery);
      await setAudience(audienceInfoSnapshot.docs.map((doc) => doc.data()));

    } catch (error) {
      console.log("An error occurred:", error);
    }
  };


  const [attendingMessage  , setAttendingMessage ] = useState('')
  


  

  useEffect(() => {
    fetchAudienceData();
    console.log(audience.length)


    switch (audience.length){
      case 1 : 
        setAttendingMessage("1 student is attending your event.")
        break
      case  audience.length > 1 : 
        setAttendingMessage(`${audience.length} students are attending your event.`)
        break
      default: 
        setAttendingMessage('no attendees yet')
    }
  }, [expanded]);

  return (
    <div>
      <Accordion
        className="ddddd"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography level="h4" noWrap={false} variant="soft">
            Event analytics highlight:
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div id="filter-secondary-span">Attendance:</div>

           
            <div id="filter-Upcoming">{attendingMessage}</div>
          </div>
        </AccordionDetails>

        <AccordionDetails>
          <div id="filter-secondary-span">Gender:</div>
          <div id="card-horzintal-scroll">ererrererre</div>
        </AccordionDetails>

        <AccordionDetails>
          <div id="filter-secondary-span">university:</div>
          <div id="card-horzintal-scroll">ererrererre</div>
        </AccordionDetails>
        <div>
          <span id="filter-btn">Detailed CSV Sheet</span>
        </div>
      </Accordion>
    </div>
  );
};

export default EventAnalytics;
