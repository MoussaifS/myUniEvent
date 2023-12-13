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
  const [response , setResponse] = useState({})
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


    </div>
  );
};

export default SignUpUserForm;
