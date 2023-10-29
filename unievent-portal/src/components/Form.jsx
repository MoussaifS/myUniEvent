import { Container, TextField, Button, styled } from "@mui/material";

import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { db, auth } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";
import "react-day-picker/dist/style.css";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-button.js";

import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import "@material/web/icon/icon.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/chips/input-chip.js";
import "@material/web/radio/radio.js";
import "@material/web/divider/divider.js";
import "@material/web/checkbox/checkbox.js";

import "@material/web/chips/suggestion-chip.js";
import { useState } from "react";
import { da } from "date-fns/locale";

const Form = () => {
  const { control, handleSubmit, register } = useForm();
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleTags = function (e) {
    console.log(tags)
    if (tags.includes(e)) {
      const updatedTags = tags.filter((tag) => tag !== e);
      setTags(updatedTags);
    } else {
      const updatedTags = [...tags, e];
      setTags(updatedTags);
    }
  };

  const eventTags = [
    { tag: "Academic Events" },
    { tag: "Career Development" },
    { tag: "Sports and activity" },
    { tag: "Social Impact" },
    { tag: "Guest Speakers" },
    { tag: "Festivals" },
    { tag: "Workshops" },
    { tag: "Hackathons" },
    { tag: "Meetups" },
  ];

  // const eventDuration = [
  //   { duration: "1 Hour" },
  //   { duration: "2 Hours" },
  //   { duration: "3 Hours" },
  //   { duration: "5 Hours" },
  //   { duration: "1 Day" },
  // ];

  const eventType = [
    { audience: "Exclusive to My Uni Students" },
    { audience: "Open to Everyone" },
  ];

  const onSubmit = async (data) => {
    data.email = auth.currentUser.email;
    data.tags = tags;
    console.log(data);
    const docRef = await addDoc(collection(db, "events"), data);
    window.location.reload(true);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <Container maxWidth="sm" id="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div>
          <h3 id="form-title-text">Event Title</h3>
          <md-outlined-text-field
            id="text-field-form"
            {...register("title")}
            required
            placeholder="Enter Event Name"
          ></md-outlined-text-field>
        </div>

        {/* Description */}
        <div>
          <h3 id="form-title-text">Event Description</h3>
          <md-outlined-text-field
            id="text-field-form"
            {...register("description")}
            required
            rows="3"
            type="textarea"
            placeholder="Write the best description for you event"
          ></md-outlined-text-field>
        </div>

        <div>
          <h3 id="form-title-text">Add Promotonal Image</h3>
          <input
            id="button"
            type="file"
            required
            accept="image/*"
            {...register("image")}
            onChange={handleChange}
          />
        </div>

        <md-divider></md-divider>
        {/* Tags */}

        <div>
          {/* target audience*/}
          <h3 id="form-title-text">Type of Event</h3>
          <span id="mini-text">
            Pick the chips that work best for your event
          </span>
          <md-chip-set id="margin-top" aria-labelledby="dates-label">
            {eventTags.map((tag) => (
              <md-filter-chip
                key={tag.id}
                onClick={() => handleTags(tag.tag)}
                label={tag.tag}
                required
                elevated
                aria-label={tag.tag}
                {...register("tags")}
              ></md-filter-chip>
            ))}
          </md-chip-set>
          <br />

          <h4 className="mt-0">Target Event Audience</h4>
          {eventType.map((e) => (
            <div key={e.id} id="ducl">
              <md-radio
                name="audience"
                value={e.audience}
                aria-label={e.audience}
                {...register("audience")}
              ></md-radio>
              <label className="margin-left" htmlFor={e.audience}>
                {e.audience}
              </label>
            </div>
          ))}
        </div>

        <md-divider></md-divider>
        {/*start date and time */}
        <div>
          <h3 id="form-title-text">Event Date & time</h3>
          <div id="form-date-div">
            <TextField
              {...register("startDate", { required: true })}
              label="Start Date"
              required
              type="date"
              variant="filled"
              fullWidth
              id="form-date-input"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("startTime", { required: true })}
              label="Start Time"
              required
              type="time"
              variant="filled"
              fullWidth
              id="form-time-input"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>

        <md-divider className></md-divider>

        <div className="fc">
          <md-filled-button type="submit" id="button">
            Publish Event
          </md-filled-button>

          <md-text-button trailing-icon>Discard</md-text-button>
        </div>
      </form>
    </Container>
  );
};

export default Form;
