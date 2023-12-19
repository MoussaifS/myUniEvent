import { useForm } from "react-hook-form";
import { auth, db } from "../../FireBase";
//RELAOD FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import "@material/web/divider/divider.js";
import { useState } from "react";
import PersonalDetails from "../../pages/admin/components/create_admin_form/PersonalDetails";
import UniversityDetails from "../../pages/admin/components/create_admin_form/UniverstiyDetails";



const SignUp = () => {
  const { handleSubmit, register } = useForm();
  const [submited, setSubmited] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});
  


  // const onSubmit = (e) => {
  //   console.log(e);
  //   createUserWithEmailAndPassword(auth, e.email, e.password)
  //     .then(async (userCredential) => {
  //       delete e.password;
  //       await addDoc(collection(db, "organizers"), e);
  //       alert("accout is created you will be redirected to login");
  //       window.location.reload(true);
  //     })
  //     .catch((error) => console.log(error));


  return (
    <div id="login">

      <div
        id="form-container-create"
        style={currentStepIndex == 0 ? {} : { display: "none" }}
      >
        <span id="form-title-span"> Tell Us about your Uni</span>
        <UniversityDetails
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
      <PersonalDetails
        setCurrentStepIndex={setCurrentStepIndex}
        currentStepIndex={1}
        setResponse={setResponse}
        response={response}
      />
    </div>

      


        
       

        
    </div>
  );
};

export default SignUp;
