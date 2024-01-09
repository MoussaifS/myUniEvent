import Nav from "../../../components/Nav";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import ShowMoreText from "react-show-more-text";
import { useParams } from "react-router-dom";
import "@material/web/chips/suggestion-chip.js";
import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";
import { useSearchParams } from "react-router-dom";
import { Link  ,useLocation , useNavigate } from "react-router-dom";

import {
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../../../FireBase";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { google } from "calendar-link";

const Events = () => {
  const title = useParams();
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();


  const fetchEventData = async () => {
    try {
      const eventDataQuery = query(
        collection(db, "events"),
        where("docId", "==", id)
      );
      const eventInfoSnapshot = await getDocs(eventDataQuery);
      eventInfoSnapshot.docs.map((doc) => setEvent(doc.data()));
    } catch (error) {
      console.log("Error fetching event data:", error);
    }
  };

  const handleCalender = () => {
    const startTime = `${event.startDate} ${event.startTime} +08`;
    const calenderUrl = {
      title: event.title,
      description: event.description,
      start: startTime,
      duration: [3, "hour"],
      busy: true,
    };
    window.open(google(calenderUrl), "_blank");
  };

  const handleContact = () => {
    const message =
      `🌟I hope this message finds all well ${event.adminClub}%0a` +
      `had a few queries regarding the *${event.title}* event and would love to discuss them further.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${event.adminPhone}&text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);
  
  const navigate = useNavigate();
  const location = useLocation();


  // http://localhost:5173/event/QAUpjRks63?tag=Sports+and+activity
  
  // http://localhost:5173/events/Guest%20Speakers

  const handleTagPrams = (e) =>{
    console.log(e.target.label)
    const tag = e.target.label;  
    const url = `/events/?tag=${tag.split(' ').join('+')}`;
    navigate(url, { state: { from: location } });
    return <Link to={url} />;
  }

  return (
    <div id="event">
      <Nav />

      {event ? (
        <div>
          <div id="event-body">
            <h1 id="event-title">{event.title}</h1>

            {event.audience == "Open to Everyone" ? (
              <span id="event-all-audince">👐Open for All🫂</span>
            ) : (
              <span id="event-private-audince">
                🤫Exclusive For {event.adminUni} Members🔐
              </span>
            )}

            <img src={event.image} id="event-image" />

            <div id="event-info-card">
              <div className="fd-r">
                <img src={locationIcon} alt="Share" className="ml-5" />
                <p className="card-helper-text">{event.adminUni} </p>
              </div>

              <div>
                <a id="event-card-btn">Open Map</a>
              </div>
            </div>

            <div id="event-info-card">
              <div className="fd-r">
                <img src={locationIcon} alt="Share" className="ml-5" />
                <p className="card-helper-text">
                  {format(new Date(event.startDate), "iii, LLL d")} •{" "}
                  {event.startTime}
                </p>
              </div>

              <div>
                <a id="event-card-btn" onClick={handleCalender}>
                  Add to Calander
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-0">Details</h3>
              <ShowMoreText
                /* Default options */
                more="Show more"
                less="Show less"
                className="event-description"
                anchorClass="show-more-less-clickable"
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                <p id="event-description">{event.description}</p>
              </ShowMoreText>
            </div>

            <div>
              <div className="mb-15">
                <h4 className="mb-0">Event Tag:</h4>
                <div id="card-horzintal-scroll">
                  {event.tags.map((tag, index) => (
                    <md-suggestion-chip
                      id="tags-horzintal"
                      key={index}
                      label={tag}
                      onClick={(e) => {
                        handleTagPrams(e);
                      }}
                    ></md-suggestion-chip>
                  ))}
                </div>
              </div>

              <div id="event-info-card-dark">
                <div>
                  <span className="card-helper-text-dark">Organizer:</span>
                  <span className="card-helper-text-dark">
                    {event.adminClub}
                  </span>
                </div>

                <div className="df-c">
                  <a id="event-card-btn" onClick={handleContact}>
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="event-attent-card">
            <div>
              <span className="fw">FROM {event.fees} RM</span>
            </div>

            <div>
              <a id="event-card-attend-btn">Attend</a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Events;
