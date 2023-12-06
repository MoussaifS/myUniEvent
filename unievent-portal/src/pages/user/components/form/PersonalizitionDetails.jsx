import { Select, TextField, MenuItem, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import "@material/web/chips/filter-chip.js";
import { eventTagList } from "../../../../lists/EventTagsList";

const PersonalizitionDetails = (props) => {
  const [errors, setErrors] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [gender, setGender] = useState(null);

  const handleTags = (tag) => {
    if (selectedTags.includes(tag)) {
      const updatedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
      setSelectedTags(updatedTags);
    } else {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
    }
  };

  useEffect(() => {
    setSelectedTags(selectedTags);
    console.log(selectedTags);
  }, [selectedTags]);

  // const handleValidation = async () => {
  //   setErrors(null);
  //   console.log(gender);
  //   console.log(major);
  //   console.log("in");

  //   if ((gender || major) == null) {
  //     setErrors("Select field can't be Empty");
  //   }

  //   if (errors === null) {
  //     props.setCurrentStepIndex(props.currentStepIndex + 1);
  //   } else {
  //     console.log("Validation errors:", errors);
  //   }
  // };

  // useEffect(() => {
  //   props.setValidated(false);
  //   if (props.validated) {
  //     handleValidation();
  //   }
  // }, [props.validated]);

  return (
    <div>
      <div>
        <md-chip-set id="margin-top" aria-labelledby="dates-label">
          {eventTagList.map((eventTag, index) => (
            <md-filter-chip
              key={index}
              onClick={() => handleTags(eventTag.tag)}
              label={eventTag.tag}
              required
              elevated
              aria-label={eventTag.tag}
              supporting-text="Which club do you with Represent"
            ></md-filter-chip>
          ))}
        </md-chip-set>
      </div>

      <Select label="Select Major" onChange={(e) => setGender(e.target.value)}>
        <MenuItem value="Female">
          <div slot="headline">Female</div>
        </MenuItem>
        <MenuItem value="Male">
          <div slot="headline">Male</div>
        </MenuItem>
      </Select>

      <TextField helperText="Please enter your name" label="Age" />
    </div>
  );
};

export default PersonalizitionDetails;
