import { Container, TextField, Button, Slider } from "@mui/material";

import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { db, auth } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";
import "react-day-picker/dist/style.css";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import "@material/web/icon/icon.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/chips/input-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/slider/slider.js";

const Form = () => {
  const { control, handleSubmit, register } = useForm();

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

  const marks = [
    {
      value: "1 Hour",
      label: "1 Hour",
    },
    {
      value: "2 Hours",
      label: "2 Hours",
    },
    {
      value: "3 Hours",
      label: "3 Hours",
    },
    {
      value: "5 Hours",
      label: "5 Hour",
    },
    {
      value: "1 Day",
      label: "1 Day",
    },
  ];

  console.log(eventTags[0].tag);
  const eventType = [
    { type: "Exclusive to University Students" },
    { type: "Open to Everyone" },
  ];

  const onSubmit = async (data) => {
    data.email = auth.currentUser.email;
    const docRef = await addDoc(collection(db, "events"), data);
    window.location.reload(true);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <Container maxWidth="sm" id="form-container">
      <md-outlined-text-field
        id="text-field-form"
        {...register("startDate", { required: true })}
        required
        type="date"
        placeholder="Enter Event Name"
      ></md-outlined-text-field>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* fisrt Name */}
        <div>
          <h3 id="dates-label">Event title</h3>
          <md-outlined-text-field
            id="text-field-form"
            {...register("name")}
            required
            placeholder="Enter Event Name"
          ></md-outlined-text-field>
        </div>

        {/* Description */}
        <div>
          <h3 id="dates-label">Event description</h3>

          
        </div>

        {/* Tags */}
        <div>
          <h3 id="dates-label">Type of Event</h3>
          <span id="mini-text">
            Pick the chips that work best for your event
          </span>
          <md-chip-set aria-labelledby="dates-label">
            {eventTags.map((tag) => (
              <md-filter-chip
                key={tag.id}
                label={tag.tag}
                required
                elevated
                aria-label={tag.tag}
              ></md-filter-chip>
            ))}
          </md-chip-set>
        </div>

        {/*start date and time */}
        <div>
          <h3 id="dates-label">Event Date & time</h3>

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

        {/* Duration */}
        <h3 id="dates-label">Event Estimated Duration</h3>

        <Slider
            disabled={false}
            marks={marks}
            size="medium"
            track={false}
            getAriaValueText={valuetext}

          />

        {/* target audience*/}

        <Controller
          name="eventInvitation"
          placeholder="Type Of Invitation"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Type Of Invitation"
              options={eventType}
            />
          )}
        />

        <Button
          fullWidth
          id="btn-publish"
          type="submit"
          variant="contained"
          color="primary"
        >
          Publish Event
        </Button>
      </form>
    </Container>
  );
};

export default Form;
