import { useForm } from "react-hook-form";
import { auth, db } from "../../../FireBase";
//RELAOD FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import PersonalDetails from "./form/PersonalDetails";
import UniversityDetails from "./form/UniverstiyDetails";
import PersonalizitionDetails from "./form/PersonalizitionDetails";

const SignUpUserForm = () => {
  const { handleSubmit, register } = useForm();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});
  const [validated, setValidated] = useState(false);

  function next() {
    setCurrentStepIndex(currentStepIndex + 1);
  }
  function back() {
    setCurrentStepIndex(currentStepIndex - 1);
  }
  const onSubmit = (e) => {
    console.log("in ", e);
  };

  return (
    <div id="login">
      <div style={currentStepIndex == 0 ? {} : { display: "none" }}>
        <span id="form-title-span"> Set up a New Account </span>
        <PersonalDetails
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={0}
          response={setResponse}
        />
      </div>

      <div
        id="signup-form-container"
        style={currentStepIndex == 1 ? {} : { display: "none" }}
      >
        <span id="form-title-span"> Tell Us about your uni </span>
        <UniversityDetails
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={1}
          response={setResponse}
        />
      </div>

      <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
      <span id="form-title-span">Help Us Personalize Every Moment!</span>
       setCurrentStepIndex={setCurrentStepIndex}
        currentStepIndex={2}
      <PersonalizitionDetails
      />
    </div>

    </div>
  );
};

export default SignUpUserForm;
