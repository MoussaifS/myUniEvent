import { useState, useEffect, useRef } from "react";
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  getDoc,
  documentId,
} from "firebase/firestore";
import { db } from "../../../FireBase";
import { format } from "date-fns";
import {
  useParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { google } from "calendar-link";
import ShowMoreText from "react-show-more-text";
import Cookies from "universal-cookie";
import Nav from "../../../components/Nav";
import ShareWhatsappBtn from "../../../components/buttons/ShareWhatsappBtn";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/button/text-button.js";
import "@material/web/dialog/dialog.js";
import "@material/web/fab/branded-fab.js";

const Events = () => {
  const inputRef = useRef(null);

  const title = useParams();
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [attended, setAttended] = useState(false);
  const cookies = new Cookies();
  const uid = cookies.get("uid");

  console.log(cookies.get("uid") == null);

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

  const fetchUserData = async () => {
    const docRef = doc(db, "users", uid);
    try {
      await getDoc(docRef).then((docSnapshot) => {
        setUser(docSnapshot.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalender = () => {
    if (uid == null) {
      inputRef.current.show();
    }
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

  const fetchUserHistory = async () => {
    const eventsRef = collection(db, "users", uid, "events"); // Subcollection reference
    const eventDocRef = doc(eventsRef, id); // Reference to the specific document in the subcollection
    try {
      const eventDocSnapshot = await getDoc(eventDocRef);
      setAttended(eventDocSnapshot.exists());
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  const handleAttending = async () => {
    if (uid) {
      const attendeeInfo = {
        name: user.fullName,
        university: user.university,
        major: user.major,
        gender: user.gender,
        email: user.email,
      };
      const eventInfo = {
        title: event.title,
        fees: event.fees,
        id: event.docId,
        image: event.image,
        startDate: event.startDate,
        startTime: event.startTime,
      };
      try {
        await setDoc(
          doc(db, `events/${event.docId}/attendees`, `${uid}`),
          attendeeInfo
        );
        await setDoc(
          doc(
            db,
            `organizer/${event.adminID}/events/${id}/attendees`,
            `${uid}`
          ),
          attendeeInfo
        );
        await setDoc(doc(db, `users/${uid}/events`, `${id}`), eventInfo);
      } catch (error) {
        console.log(error);
        handleOpenFormClick();
      }
    }
  };

  function handleOpenFormClick() {
    inputRef.current.show();
  }

  function handleCloseFormClick() {
    inputRef.current.close();
  }

  const handleContact = () => {
    const message =
      `🌟I hope this message finds all well ${event.adminClub}%0a` +
      `had a few queries regarding the *${event.title}* event and would love to discuss them further.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+60${event.adminPhone}&text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    fetchEventData();
    fetchUserData();
    fetchUserHistory();
  }, [id]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleTagPrams = (e) => {
    const tag = e.target.label;
    const url = `/events/?tag=${tag.split(" ").join("+")}`;
    navigate(url, { state: { from: location } });
    return <Link to={url} />;
  };

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
              <span className="fb">FROM {event.fees} RM</span>
            </div>

            <div>
              



              {
                attended ?
                <a id= "event-card-attended-btn" onClick={handleAttending}> Attended </a> 
                :
                <a id= "event-card-attend-btn" onClick={handleAttending}> Attend </a> 
                
              }



              <md-dialog className="zi-99" ref={inputRef}>
                <div className="df-c" slot="content" method="dialog">
                  <h3>You need to log in to attend</h3>
                  <md-outlined-button onClick={handleCloseFormClick}>
                    close
                  </md-outlined-button>
                </div>
              </md-dialog>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Events;
