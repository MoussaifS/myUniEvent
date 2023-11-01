import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { db, auth , storage } from "../FireBase";
import {ref, uploadBytes} from "firebase/storage"

import { collection, addDoc  ,setDoc , doc  } from "firebase/firestore";
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
import { useState } from "react";

const Form = () => {
  const { control, handleSubmit, register } = useForm();
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleTags = function (e) {
    if (tags.includes(e)) {
      const updatedTags = tags.filter((tag) => tag !== e);
      setTags(updatedTags);
    } else {
      const updatedTags = [...tags, e];
      setTags(updatedTags);
    }
  };

  const handleImage = (event) => {
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

  const uploadImage = (data) => {
    const ImageRef  = ref(storage , `events/${data.title}`)
    uploadBytes(ImageRef, data.image).then(()=>{
      alert("shit works")
    })
  } 

  const onSubmit = async (data) => {
    data.email = auth.currentUser.email;
    data.tags = tags;
    uploadImage(data)
    const docRef = await addDoc(collection(db, "events"), data );
    console.log(docRef)
    window.location.reload(true);
  };

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)} method="dialog">
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
            onChange={handleImage}
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
          <md-filled-button className="p-0" type="submit" id="button">
            Publish Event
          </md-filled-button>
        </div>
      </form>
    </div>
  );
};
export default Form;
