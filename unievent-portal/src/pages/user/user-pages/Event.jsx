import Nav from "../../../components/Nav";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import ShowMoreText from "react-show-more-text";
import { useParams } from "react-router-dom";
import "@material/web/chips/suggestion-chip.js";

import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../FireBase";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const Events = () => {
  // console.log(useParams());
  const title = useParams();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchEventData = async () => {
    console.log('in')
    const db = getFirestore();
    const docRef = doc(db, "events", "cdf6456e-ada8-4f0b-aef2-7135ba0caaee"    );
    try {
      const docSnap = await getDoc(docRef);
      setEvent(docSnap.data());
      console.log(docSnap.data())
    } catch (error) {
      console.alert(error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <div id="event ">
      <Nav />

      <div id="event-body">
        <h1 id="event-title">{event.title}</h1>
        <span></span>
        <img src={event.image} id="event-image" />

        <div id="event-info-card">
          <div className="fd-r">
            <img src={locationIcon} alt="Share" className="ml-5" />
            <p className="card-helper-text">manipal internationl university</p>
          </div>

          <div>
            <a id="event-card-btn">Open Map</a>
          </div>
        </div>

        <div id="event-info-card">
          <div className="fd-r">
            <img src={locationIcon} alt="Share" className="ml-5" />
            <p className="card-helper-text"></p>
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
              
            </div>
          </div>

          <div id="event-info-card-dark">
            <div>
              <span className="card-helper-text-dark">Organizer:</span>
              <span className="card-helper-text-dark">cs Club</span>
            </div>

            <div className="df-c">
              <a id="event-card-btn">connact the orgnizer</a>
              <a id="event-card-btn">follow</a>
            </div>
          </div>
        </div>
      </div>

      <div id="event-attent-card">
        <div>
          <span>This event is </span>
          <span>from 300rm</span>
        </div>

        <div>
          <a id="event-card-attend-btn">Attend</a>
          <img src={locationIcon} alt="Share" className="ml-5" />
        </div>
      </div>
    </div>
  );
};

export default Events;
