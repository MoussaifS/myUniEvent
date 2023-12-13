import Nav from "../../../components/Nav";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import locationIcon from "../../../assets/location-pin-svgrepo-com(1).svg";
import ShowMoreText from "react-show-more-text";
import { useParams } from "react-router-dom";



const Events = () => {
  console.log(useParams())
  let car = [{}, {}, {}];
  return (
    <div id="event ">
      <Nav />

      <div id="event-body">
        <h1 id="event-title">2024 Forex Summit（Kuala Lumpur）</h1>
        <span></span>
        <img src="../../../../src/assets/event.jpg" id="event-image" />

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
            <p className="card-helper-text">sat .thue 20012 5pm</p>
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
            <p id="event-description">
              Welcome to an exclusive webinar that will unravel the capabilities
              of ChatGPT, a leading-edge language model. Join us as we explore
              how ChatGPT can not only boost your career, supercharge
              productivity, but also become a creative force in your
              entrepreneurial journey through advanced prompt generation. What
              You'll Discover: Dive into the fascinating landscape of AI
              technologies, including generative AI and LLM. Uncover the ways AI
              can propel your career to new heights. Uncover how ChatGPT can
              elevate your career, transforming the way you communicate and
              innovate. Hear successstories of individuals harnessing ChatGPT for creative and
              professional breakthroughs. Learn best practices for integrating
              ChatGPT into your projects and prompt generation strategies.
            </p>
          </ShowMoreText>
        </div>

        <div >
        <div className="mb-15"> <h4 className="mb-0">Event Tag:</h4>
        <div id="card-horzintal-scroll">
          {car.map((tag, index) => (
            <md-suggestion-chip
              id="tags-horzintal"
              key={index}
              label={tag}
            ></md-suggestion-chip>
          ))}
        </div></div>
          

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
