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
import { useSearchParams } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import FeeIcon from "../../../assets/fee-label-price-svgrepo-com.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Cards = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();


  const handleRedirctEvent = () => {
    navigate(`/event/${encodeURIComponent(props.event.docId)}`, {
      state: { from: location },
    });
    <Link to={`/event/${encodeURIComponent(props.event.docId)}`} />;
  };

  const handleTagPrams = (e) => {
    setSearchParams({ tag: e.target.label });
  };

  return (
    <Card class="pr" sx={{ maxWidth: 700 }} onClick={handleRedirctEvent}>
      {props.event.approved ? (
        <VerifiedIcon id="verified-Icon" color="primary" fontSize="large" />
      ) : null}

      <img src={props.event.image} id="card-image" />
      


      <div className="fd-r">
        <span id="span-card-date">
          {format(new Date(props.event.startDate), "iii, LLL d")} •{" "}
          {props.event.startTime}
        </span>
      </div>


      <div className="fd-r">
        <div>
          <h2 id="card-title">{props.event.title}</h2>
          <div className="fd-r">
            <img src={locationIcon} alt="Share" className="ml-5" />
            <p className="card-helper-text">
              {props.event.adminClub} club under "{props.event.adminUni}"{" "}
            </p>
          </div>
          <div className="fd-r">
            <img src={FeeIcon} alt="Share" className="ml-5" />
            <p className="card-helper-text">For {props.event.fees} Ringit</p>
          </div>
        </div>
      </div>

      <div id="card-tag-container">
        {props.event.tags.map((tag, index) => (
          <span id="card-tags" key={index}>
            {" "}
            | {tag} |{" "}
          </span>
        ))}
      </div>

      <div id="card-btns">
        <ShareWhatsappBtn {...props} />
      </div>
    </Card>
  );
};

export default Cards;
