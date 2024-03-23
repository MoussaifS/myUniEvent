import { useState, useEffect } from "react";
import "@material/web/chips/filter-chip.js";
import { eventTagList } from "../../../../lists/EventTagsList";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";

const PersonalizitionDetails = (props) => {
  const [errors, setErrors] = useState("");
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
  }, [selectedTags]);

  const handleValidation = async () => {
    let errors = {};
    if (selectedTags.length == 0) {
      errors.tags = "at least select one tag ";
    }

    if (gender == null) {
      errors.gender = "field cant be Empty";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.setResponse({
        ...props.response,
        preferredEvent: selectedTags,
        gender: gender,
      });
      props.setCurrentStepIndex(props.currentStepIndex + 1);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div id="details-forms">
      <p className="signup-helper-text"> 👩🏼 or 👨🏽:</p>
      {errors.gender ? (
        <span className="form-helper-text-error">{errors.gender}</span>
      ) : null}
      <md-outlined-select
        id="text-field-credentials"
        required
        selectIndex="1"
        label="Gender"
        onInput={(e) => setGender(e.target.value)}
      >
        <md-select-option value="male">
          <div slot="headline">Male</div>
        </md-select-option>
        <md-select-option value="male">
          <div slot="headline">female</div>
        </md-select-option>
      </md-outlined-select>

      <p className="signup-helper-text">What types of event you are into?</p>
      {errors.tags ? (
        <span className="form-helper-text-error">{errors.tags}</span>
      ) : (
        <span id="form-helper-text">Choose the closest Event Tag</span>
      )}

      <div className="tag-chips">
        <md-chip-set>
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

      <div id="form-btns-navigation">
        <span id="form-btn-next" onClick={handleValidation}>
          Next
        </span>
      </div>

      
    </div>
  );
};

export default PersonalizitionDetails;
