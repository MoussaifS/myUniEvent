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
  const [shit, setShit] = useState(2);
  const [response , setResponse] = useState({})
  
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
  console.log(currentStepIndex)
  return (
    <div id="signup-form-container">
      <div id="signup-form-elment" style={currentStepIndex == 0 ? {} : { display: "none" }}>
        <span id="formSpan"> Set up a new account </span>
        <PersonalDetails
          validated={validated}
          setValidated={setValidated}
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={0}
          response={setResponse}
        />
        <div  id="formNavBtns">
          <span id="formNextBtn" onClick={() => setValidated(true)}>
            Next
          </span>
        </div>
      </div>

      <div id="signup-form-container" style={currentStepIndex == 1 ? {} : { display: "none" }}>
        <span id="formSpan">What is your Current major?</span>
        <UniversityDetails
          validated={validated}
          setValidated={setValidated}
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={1}
        />
        <div id="formNavBtns">
          <span id="formNextBtn" >
            Next
          </span>
          <span id="formBackBtn" onClick={back}>
            Back
          </span>
        </div>
      </div>

      <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
        <span id="formSpan">Help Us Personalize Every Moment!</span>
        <PersonalizitionDetails
          validated={validated}
          setValidated={setValidated}
        />

        <div id="formNavBtns">
          <span id="formNextBtn">Submit</span>
          <span id="formBackBtn" onClick={back}>
            Back
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpUserForm;
