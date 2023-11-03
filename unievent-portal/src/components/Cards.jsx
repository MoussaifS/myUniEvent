import Card from "@mui/material/Card";

import "@material/web/divider/divider.js";
import "@material/web/icon/icon.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/chips/input-chip.js";
import "@material/web/chips/suggestion-chip.js";
import { format, parseISO } from "date-fns";
import ShowMoreText from "react-show-more-text";

const Cards = (props) => {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <div className="fd-r">
        <span id="span-card-date">
          {format(new Date(props.event.startDate), "iii , LLL d")} •{" "}
          {props.event.startTime}
        </span>
      </div>

      <div className="fd-r">
        <img
          src="/src/assets/3c1aa898-cc8f-476c-ba1b-2ffff0a65461.jpeg"
          width="150"
          height="150"
        />
        <div>
          <h2 className="m-10">{props.event.title}</h2>
          <div className="m-5">
            <md-suggestion-chip
              label={props.event.audience}
            ></md-suggestion-chip>
          </div>
        </div>
      </div>

      <div className="m-10">
        <ShowMoreText
          /* Default options */
          lines={2}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="show-more-less-clickable"
          expanded={false}
          truncatedEndingComponent={"... "}
        >
          <p id="card-description">{props.event.description}</p>
        </ShowMoreText>
      </div>
      <md-divider inset></md-divider>

      <div className="fd-c">

        <div className="m-10">
          <h4 className="m-5">Event Tags:</h4>
          <md-chip-set >
            {props.event.tags.map((tag, index) => (
              <md-suggestion-chip key={index} label={tag}></md-suggestion-chip>
            ))}
          </md-chip-set>
        </div>
      </div>
      <md-divider inset></md-divider>
      <div className="m-10" >
        <md-filled-button>Share event</md-filled-button>
        <md-filled-tonal-button>delete</md-filled-tonal-button>
        <md-filled-tonal-button>edit</md-filled-tonal-button>
      </div>
    </Card>
  );
};

export default Cards;
