import { auth, db } from "../../../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import PersonalDetails from "./createUserFrom/PersonalDetails";
import UniversityDetails from "./createUserFrom/UniverstiyDetails";
import PersonalizitionDetails from "./createUserFrom/PersonalizitionDetails";
import { useLocation, useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submited, setSubmited] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});

  const createUser = async () => {
    await createUserWithEmailAndPassword(
      auth,
      response.email,
      response.password
    )
      .then(async (userCredential) => {
        delete response.password;
        await setDoc(doc(db, "users", userCredential.user.uid), response);

        response.studentID = userCredential.user.uid;
        console.log(response.uniID);
        const UniStudent = {
          stundetID: response.studentID,
          major: response.major,
          email: response.email,
          name: response.fullName,
        };
        await setDoc(
          doc(db, `university/${response.uniID}/students`, response.studentID),
          UniStudent
        );

        
        window.location.reload(true);
      })
      .catch((error) => {
        if (error.code == "auth/email-dd-in-use") {
          alert("The email address is already in use");
        } else if (error.code == "auth/invalid-email") {
          alert("The email address is not valid.");
        } else if (error.code == "auth/operation-not-allowed") {
          alert("Operation not allowed.");
        } else if (error.code == "auth/weak-password") {
          alert("The password is too weak.");
        }
      });
  };

  useEffect(() => {
    createUser();
    setSubmited(false);
  }, [submited]);

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
        id="form-container-create"
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
          submited={setSubmited}
        />
      </div>
    </div>
  );
};

export default CreateUserForm;
