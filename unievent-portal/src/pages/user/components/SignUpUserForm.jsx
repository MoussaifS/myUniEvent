import { useForm } from "react-hook-form";
import { auth, db } from "../../../FireBase";
//RELAOD FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import "@material/web/divider/divider.js";
import { useState } from "react";
import { eventTagList } from "../../../lists/EventTagsList";
import "@material/web/chips/filter-chip.js";
import PersonalDetails from "./form/PersonalDetails";
import UniversityDetails from "./form/UniverstiyDetails";


const SignUpUserForm = () => {
  const { handleSubmit, register } = useForm();
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [shit, setShit] = useState(0);

  function next() {
    setCurrentStepIndex(currentStepIndex + 1);
  }

  function back() {
    setCurrentStepIndex(currentStepIndex - 1);
  }

  const onSubmit = (e) => {
    console.log("in ", e);
  };

  const handleThisShit = () => {
    setShit(shit + 1);
    console.log(shit);
  };

  const [validated, setValidated] = useState(false);
  const [validationHandling, setvalidationHandling] = useState(false);

  return (
    <form>
      <div style={currentStepIndex == 0 ? {} : { display: "none" }}>
        <span id="formSpan"> Set up a new account </span>
        <PersonalDetails
          validated={validated}
          setValidated={setValidated}
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={0}
        />
        <div id="formNavBtns">
          <span id="formNextBtn" onClick={() => setValidated(true)}>
            Next
          </span>
        </div>
      </div>

      <div style={currentStepIndex == 1 ? {} : { display: "none" }}>
        <span id="formSpan">What is your Current major?</span>
        <UniversityDetails
          validated={validated}
          setValidated={setValidated}
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={0}
        />
        <div id="formNavBtns">
          <span id="formNextBtn" onClick={next}>
            Next
          </span>
          <span id="formBackBtn" onClick={back}>
            Back
          </span>
        </div>
      </div>

      <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
        <span id="formSpan">Help Us Personalize Every Moment!</span>

        <div>
          <span className="signup-helper-text">
            What type of events you prefer
          </span>
          {eventTagList.map((eventTag, index) => (
            <md-filter-chip
              id="tags-horzintal"
              key={index}
              label={eventTag.tag}
              elevated
            ></md-filter-chip>
          ))}
        </div>

        <md-outlined-select id="text-field-credentials" required label="Gender">
          <md-select-option
            value="male"
            aria-label="male"
            {...register("gender")}
          >
            <div slot="headline">Male</div>
          </md-select-option>

          <md-select-option
            value="female"
            aria-label="female"
            {...register("gender")}
          >
            <div slot="headline">female</div>
          </md-select-option>
        </md-outlined-select>

        <md-outlined-text-field
          id="text-field-credentials"
          {...register("age")}
          required
          type="number"
          label="Age"
          placeholder="Age"
        ></md-outlined-text-field>

        <div id="formNavBtns">
          <span id="formNextBtn">Submit</span>
          <span id="formBackBtn" onClick={back}>
            Back
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpUserForm;
