import { useForm } from "react-hook-form";
import { auth, db } from "../../../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import PersonalDetails from "./form/PersonalDetails";
import UniversityDetails from "./form/UniverstiyDetails";
import PersonalizitionDetails from "./form/PersonalizitionDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SignUpUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submited, setSubmited] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});
  function next() {
    setCurrentStepIndex(currentStepIndex + 1);
  }
  function back() {
    setCurrentStepIndex(currentStepIndex - 1);
  }


  if(submited){
    console.log(response);
    createUserWithEmailAndPassword(auth, response.email, response.password)
      .then(async (userCredential) => {
        delete response.password;
        response.userId = uuidv4(); 
        await addDoc(collection(db, "users"), response);
        navigate("/user-auth", { replace: true, state: { from: location } });
      })
      .catch((error) => console.log(error));
    setSubmited(false)
  }

  return (
    <div id="login">

    <div style={currentStepIndex == 0 ? {} : { display: "none" }}>
        <span id="form-title-span">Help Us Personalize Every Moment!</span>
        <PersonalizitionDetails
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={0}
          setResponse={setResponse}
          response={response}
        />
      </div>

      <div
      id="signup-form-container"
      style={currentStepIndex == 1 ? {} : { display: "none" }}
    >
      <span id="form-title-span"> Tell Us about your Uni</span>
      <UniversityDetails
        setCurrentStepIndex={setCurrentStepIndex}
        currentStepIndex={1}
        setResponse={setResponse}
        response={response}
      />
    </div>


      <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
        <span id="form-title-span"> Set up the New Account </span>
        <PersonalDetails
          setCurrentStepIndex={setCurrentStepIndex}
          currentStepIndex={2}
          setResponse={setResponse}
          response={response}
          submited = {setSubmited}
        />
      </div>

     

      
    </div>
  );
};

export default SignUpUserForm;
