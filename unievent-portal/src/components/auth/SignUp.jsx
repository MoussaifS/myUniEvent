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
import { useState , useEffect } from "react";
import PersonalDetails from "../../pages/admin/components/create_admin_form/PersonalDetails";
import UniversityDetails from "../../pages/admin/components/create_admin_form/UniverstiyDetails";


import { setDoc, getDocs , doc, getDoc,  query , where} from "firebase/firestore";


const SignUp = () => {
  const { handleSubmit, register } = useForm();
  const [submited, setSubmited] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});
  


  const createUser = async ()=> {

    await createUserWithEmailAndPassword(auth, response.email, response.password).then(async(organizerCredential) => {
          delete response.password;
          await setDoc(doc(db, "organizers",  organizerCredential.user.uid), response);
  
          const UniOrganizer = {
            stundetID : organizerCredential.user.uid,
            club :response.major,
            email: response.email,
            role: response.role,
            clubName: response.clubName,
            name: response.fullName
          }
          await setDoc(doc(db, `university/${response.uniID}/organizer`,  organizerCredential.user.uid), UniOrganizer);
  
          alert("accout is created you will be redirected to login");
          // window.location.reload(true);
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
    }

    useEffect(()=>{
      createUser()
      setSubmited(false)
    },[submited])


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
        submited={setSubmited}
      />
    </div> 
    </div>
  );
};

export default SignUp;
