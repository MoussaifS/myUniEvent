import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const Filter = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectedTags, setSelectedTags] = useState(null);

  useEffect(() => {}, [searchParams]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTag = (e) => {
    console.log(e.target.value);
  };
  const handleClearPrams = () => {
    searchParams.delete("tag");
  };

  // Variable to store the currently selected tag

  return (
    <div id="duck" className="mb-25">
      <Accordion
        className="ddddd"
        value="car"
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <div>
            Filters:
            {selectedTags || searchParams.get("tag") ? (
              <md-input-chip
                lable={selectedTags ? 232 : searchParams.get("tag")}
                onClick={() => handleClearPrams()}
              ></md-input-chip>
            ) : null}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div id="filter-secondary-span">Time Frame:</div>
            <div id="filter-Upcoming">
              <md-filter-chip
                label="This Week"
                elevated
                onClick={(e) => {
                  handleTag(e);
                }}
              >
                {" "}
              </md-filter-chip>
              <md-filter-chip
                label="This Month"
                elevated
                onClick={(e) => {
                  handleTag(e);
                }}
              ></md-filter-chip>

              <md-filter-chip
                label="All Events"
                elevated
                onClick={(e) => {
                  handleTag(e);
                }}
              ></md-filter-chip>
            </div>
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
