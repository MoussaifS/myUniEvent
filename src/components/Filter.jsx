import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {
  useParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const Filter = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [selectedTags, setSelectedTags] = useState(null);

  useEffect(() => {}, [searchParams]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  const navigate = useNavigate();
  const location = useLocation();

  const handleTag = (e) => {
    handleClearPrams()
    const tag = e;
    setSelectedTags(tag)
    console.log(tag)
    const url = `/events/?time=${tag.split(" ").join("+")}`;
    navigate(url, { state: { from: location } });
    return <Link to={url} />;
  };

  const handleClearPrams = () => {
    searchParams.delete("tag");
    searchParams.delete("time ");
  };

  // Variable to store the currently selected tag

  return (
    <div id="duck" className="mb-25">
      <div>
        <div id="filter-secondary-span">filter by Time:</div>
        <div id="filter-Upcoming">
          <md-filter-chip
            label="This Week"
            elevated
            onClick={(e) => {
              handleTag("This Week");
            }}
          >
            {" "}
          </md-filter-chip>
          <md-filter-chip
            label="This Month"
            elevated
            onClick={() => {
              handleTag("This Month");
            }}
          ></md-filter-chip>

          <md-filter-chip
            label="All Events"
            elevated
            onClick={() => {
              handleTag("all events");
            }}
          ></md-filter-chip>
        </div>
      </div>
    </div>
  );
};

export default Filter;
