import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useState, useEffect } from "react";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../FireBase";

const EventAnalytics = (props) => {
  const [expanded, setExpanded] = useState(false);
  const docId = props.docId;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
            <div id="filter-Upcoming">dfdfdfdfdfdfdfdf</div>
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
