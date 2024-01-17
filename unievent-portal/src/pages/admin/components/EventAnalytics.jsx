import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import * as jsonexport from "jsonexport/dist"
import { db } from "../../../FireBase";
import { BarChart ,PieChart } from "@mui/x-charts";
const EventAnalytics = (props) => {
  

  const [expanded, setExpanded] = useState(false);
  const [audience, setAudience] = useState([]);
  const [counts, setCounts] = useState({
    genders: { male: 0, female: 0 },
    majors: {},
  });
  const docId = props.docId;
  let gender = [];
  let attending = 0;
  let university = [];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchAudienceData = async (a) => {
    try {
      const audienceDataQuery = await query(
        collection(db, `events/${docId}/attendees`),
        orderBy("name", "asc")
      );
      const audienceInfoSnapshot = await getDocs(audienceDataQuery);
      await setAudience(audienceInfoSnapshot.docs.map((doc) => doc.data()));
      console.log(audience);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };


  const handleCSV = () => {
    jsonexport(audience, function(err, csv){
      if (err) return console.error(err);
  
      // Create a Blob from the CSV data
      const blob = new Blob([csv], { type: 'text/csv' });
  
      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      // Set the filename for the download
      link.download = 'audience_data.csv';
  
      // Append the link to the document
      document.body.appendChild(link);
  
      // Trigger the click event on the link to start the download
      link.click();
  
      // Remove the link from the document
      document.body.removeChild(link);
    });
  };

 

  console.log(audience)

 

 



  const [attendingMessage, setAttendingMessage] = useState("");

  useEffect(() => {
    fetchAudienceData();
    console.log(audience.length);

    switch (audience.length) {
      case 1:
        setAttendingMessage("1 student is attending your event.");
        break;
      case audience.length > 1:
        setAttendingMessage(
          `${audience.length} students are attending your event.`
        );
        break;
      default:
        setAttendingMessage("no attendees yet");
    }

    function countAttributes(data) {
      const result = {
        genders: { male: 0, female: 0 },
        majors: {},
      };

      data.forEach((entry) => {
        // Count genders
        const gender = entry.gender.toLowerCase();
        result.genders[gender] = (result.genders[gender] || 0) + 1;

        // Count majors
        const major = entry.major.toLowerCase();
        result.majors[major] = (result.majors[major] || 0) + 1;
      });

      setCounts(result);
    }
    countAttributes(audience);
    console.log(counts);
  }, [expanded]);

  return (
    <div>
      <Accordion
        className="ddddd"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography level="h4" noWrap={false} variant="soft">
            Event analytics highlight:
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div id="filter-secondary-span">Attendance:</div>

            <div id="filter-Upcoming">{attendingMessage}</div>
          </div>
        </AccordionDetails>

        <AccordionDetails>
          <div id="filter-secondary-span">Gender:</div>
          <div id="card-horzintal-scroll">
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: ["female", "male"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [counts.genders.female, counts.genders.male],
                },
              ]}
              width={300}
              height={200}
            />
          </div>
        </AccordionDetails>
        <div>
          <span id="filter-btn" onClick={handleCSV}>Detailed CSV Sheet</span>
        </div>
      </Accordion>
    </div>
  );
};

export default EventAnalytics;
