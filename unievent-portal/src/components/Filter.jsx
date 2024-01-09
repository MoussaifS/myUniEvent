import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";
import { useSearchParams } from "react-router-dom";
import { useState , useEffect} from "react";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { eventTagList } from "../lists/EventTagsList";
const Filter = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectedTags, setSelectedTags] = useState([]);

  const handleTag = (e) => {
    let params = e.target.label;
    let tag = e.target.label;
    console.log(params);
    if (selectedTags.includes(tag)) {
      // If the tag is already selected, remove it
      const updatedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
      setSelectedTags(updatedTags);

      const updatedParams = updatedTags.join(", ");
      setSearchParams({ q: updatedParams });
    } else {
      // If the tag is not selected, add it
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);

      const updatedParams = updatedTags.join(", ");
      setSearchParams({ q: updatedParams });
      console.log(updatedParams);
    }
  };


  useEffect(() => {
    
  }, [searchParams]);
  

  const [expanded, setExpanded] = useState(false);




  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const handleClearPrams = () =>  {
    searchParams.delete("tag")
  };

  
  

  // Variable to store the currently selected tag


  console.log(searchParams.get("tag"))


  return (
    <div id="duck" className="mb-25">
      <Accordion
        className="ddddd"
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <div>Filters:<md-input-chip label={searchParams.get("tag")} onClick={()=>handleClearPrams()}></md-input-chip>  </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div id="filter-secondary-span">Time Frame:</div>
            <div id="filter-Upcoming">
              <md-filter-chip
                label="This Week"
                elevated
                onClick={(e) => {
                  handleTimeFrame(e);
                }}
                disabled
              >
                {" "}
              </md-filter-chip>
              <md-filter-chip
                label="This Month"
                elevated
                onClick={(e) => {
                  handleTimeFrame(e);
                }}
              ></md-filter-chip>

              <md-filter-chip
                label="All Events"
                elevated
                onClick={(e) => {
                  handleTimeFrame(e);
                }}
              ></md-filter-chip>
            </div>
          </div>
        </AccordionDetails>

        <AccordionDetails>
          <div id="filter-secondary-span">Tags:</div>
          <div id="card-horzintal-scroll">
            {eventTagList.map((eventTag, index) => (
              <md-filter-chip
                id="tags-horzintal"
                key={index}
                label={eventTag.tag}
                elevated
                onClick={(e) => {
                  handleTag(e);
                }}
              ></md-filter-chip>
            ))}
          </div>
        </AccordionDetails>
        <div>
          <span id="filter-btn">Apply</span>
        </div>
      </Accordion>
    </div>
  );
};

export default Filter;
