import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";

import { useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary,  Typography  } from "@mui/material";



import { eventTagList } from "../lists/EventTagsList";
const Filter = (props) => {

  
  //sudo code 
  const handleTag = (e) => {
    console.log(e.target.label)
    // 1- pass to the query
    // 2- navigate to the event page with the filter 
    // 3- if query empty display all 
    // 4- remove the date filters for now 
  }

  const [expanded, setExpanded] = useState(false);



const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div id="duck">

     <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Filters:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>

          <md-filter-chip
            id="tags-horzintal"
            
            label="tag"
            elevated
            onClick={(e)=>{handleTag(e)}}
          ></md-filter-chip>

          
        </AccordionSummary>
        <AccordionDetails>
        <div id="card-horzintal-scroll">
        {eventTagList.map((eventTag, index) => (
          <md-filter-chip
            id="tags-horzintal"
            key={index}
            label={eventTag.tag}
            elevated
            onClick={(e)=>{handleTag(e)}}
          ></md-filter-chip>
        ))}
      </div>
        </AccordionDetails>
      </Accordion>
      



      
    </div>
  );
};

export default Filter;
