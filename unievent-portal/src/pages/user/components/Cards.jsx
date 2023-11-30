import Card from "@mui/material/Card";
import "@material/web/divider/divider.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/chips/input-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/icon/icon.js";
import "@material/web/button/outlined-button.js";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import { format } from "date-fns";

import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import FeeIcon from "../../../assets/fee-label-price-svgrepo-com.svg";
const Cards = (props) => {
  return (
    <Card class="pr" sx={{ maxWidth: 700 }}>
      <img src={props.event.image} id="image-card" />
      <div className="fd-r">
        <span id="span-card-date">
          {format(new Date(props.event.startDate), "iii, LLL d")} •{" "}
          {props.event.startTime}
        </span>
      </div>

      <div className="fd-r">
        <div>
          <h2 className="m-10">{props.event.title}</h2>
          <div className="fd-r">
            <img src={locationIcon} alt="Share" className="m-5" />
            <p className="card-helper-text">manipal internationl university</p>
          </div>
          <div className="fd-r">
            <img src={FeeIcon} alt="Share" className="m-5" />
            <p className="card-helper-text">for 200 ringit</p>
          </div>
        </div>
      </div>
      
      <md-divider inset></md-divider>

      <div className="m-10">
        <span className="card-helper-text">Tags:</span>
        <div id="card-horzintal-scroll">
          {props.event.tags.map((tag, index) => (
            <md-suggestion-chip
              id="tags-horzintal"
              key={index}
              label={tag}
            ></md-suggestion-chip>
          ))}
        </div>
      </div>

        <div id="card-btns">
          <ShareWhatsappBtn {...props} />
        </div>
    </Card>
  );
};

export default Cards;
