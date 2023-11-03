import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { db, auth, storage } from "../FireBase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-button.js";
import "@material/web/icon/icon.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/radio/radio.js";
import "@material/web/divider/divider.js";
import { useState, useRef } from "react";
import { format, parseISO } from "date-fns";

const Form = () => {
  const { control, handleSubmit, register } = useForm();
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const dddd = "/src/assets/3c1aa898-cc8f-476c-ba1b-2ffff0a65461.jpeg";
  const [date, setDate] = useState(null);
  const [errorDate, setErrorDate] = useState(false);

  const checkDateValue = function (e) {
    setDate(e.target.value);
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const eventPotentialDate = format(parseISO(date), "yyyy-MM-dd");
    currentDate >= eventPotentialDate
      ? setErrorDate(true)
      : setErrorDate(false);
  };

  const handleTags = function (e) {
    if (tags.includes(e)) {
      const updatedTags = tags.filter((tag) => tag !== e);
      setTags(updatedTags.data);
    } else {
      const updatedTags = [...tags, e];
      setTags(updatedTags);
    }
  };

  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = async (data) => {
    console.log('in' , imageUpload)
    const imageRef = ref(storage, `events/${data}`);
    await uploadBytes(imageRef, imageUpload).then((respons) => {
      console.log('duck', respons);
    });
  };

  

  // const handleImage = (event) => {
  //   const reader = new FileReader();

  //   reader.onload = async (e) => {
  //     const imageUrl = e.target.result;
  //     await localStorage.setItem("recent-image", imageUrl);
  //     await setImageUrl(imageUrl);
  //     console.log('onload ', imageUrl);
  //   };

  //     setImageUrl(reader.readAsDataURL(event.target.files[0]));
  //     console.log('if ', imageUrl);

  // };

  // const uploadImage = async (dataUrl) => {
  //   const imageRef = ref(storage, `events/${dataUrl.title}`);

  //   await uploadBytes(imageRef, dataUrl.image).then(() => {
  //     alert("Upload successful!");
  //   });
  // };

  // const handleImage = (event) => {
  //   const img = new Image();
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     console.log(e.target.result);
  //     localStorage.setItem("recent-image", e.target.result);
  //     setImageUrl(e.target.result);
  //     console.log(imageUrl);
  //   };
  //   if (event.target.files[0]) {
  //     reader.readAsDataURL(event.target.files[0]);
  //     console.log(reader.readAsDataURL(event.target.files[0]));
  //   }
  // };

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
    if (errorDate) {
      console.log("Error: Invalid Date");
    } else {
      try {
        data.email = auth.currentUser.email;
        data.tags = tags;
        await uploadImage(data.title)
        const docRef = await addDoc(collection(db, "events"), data);
        console.log("Document added:", docRef);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method="dialog">
        {/* title */}

        <d src={imageUrl} alt="this is a car" />

        <di></di>

        <div>
          <h3 id="form-title-text">Event Title</h3>
          <md-outlined-text-field
            maxlength="50"
            minlength="2"
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
            minlength="2"
            rows="3"
            type="textarea"
            placeholder="Write the best description for your event"
          ></md-outlined-text-field>
        </div>

        <div>
          <h3 id="form-title-text">Add Promotonal Image</h3>
          <input
            id="button"
            type="file"
            required
            accept="image/*"
            onChange={(e) => {
              setImageUpload(e.target.files[0]) ;
            }}
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
              onChange={(e) => checkDateValue(e)}
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
          {errorDate ? (
            <span id="error-span">Date should be equal to or after today</span>
          ) : null}
        </div>

        <md-divider></md-divider>

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
