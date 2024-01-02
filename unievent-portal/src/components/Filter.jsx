import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary,  Typography  } from "@mui/material";



import { eventTagList } from "../lists/EventTagsList";
const Filter = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();

  
  //sudo code 
  const handleTag = (e) => {
    // 1- pass to the query
    // 2- navigate to the event page with the filter 
    // 3- if query empty display all 
    // 4- remove the date filters for now 
    let params = e.target.label;
    setSearchParams(params);

    console.log(searchParams)

  }



  const [expanded, setExpanded] = useState(false);



const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div id="duck" className="mb-25">

     <Accordion className="ddddd" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div>
            Filters:
          </div>


          
         
          
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
