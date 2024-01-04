import Nav from "../../../components/Nav";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import ShowMoreText from "react-show-more-text";
import { useParams } from "react-router-dom";
import "@material/web/chips/suggestion-chip.js";
import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";

import {
  getFirestore,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../../../FireBase";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const Events = () => {
  const title = useParams();
  const [event, setEvent] = useState(null);
  const { id } = useParams();

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

  useEffect(() => {
    fetchEventData();
  }, [id]);

  return (
    <div id="event">
      <Nav />

      {event ? (
        <div>
          <div id="event-body">
            <h1 id="event-title">{event.title}</h1>
            <span></span>
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
                <a id="event-card-btn">Add to Calander</a>
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
                  <a id="event-card-btn">connact the orgnizer</a>
                </div>
              </div>
            </div>
          </div>

          <div id="event-attent-card">
            <div>
              <span>FROM {event.fees} RM</span>
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
