import { auth, db } from "../../../../FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState , useEffect } from "react";
import PersonalDetails from "../create_admin_form/PersonalDetails";
import UniversityDetails from "../create_admin_form/UniverstiyDetails";
import { setDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";


const CreateAdminForm = () => {
  const [submited, setSubmited] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const location = useLocation();


  const createUser = async ()=> {

    await createUserWithEmailAndPassword(auth, response.email, response.password).then(async(organizerCredential) => {
      delete response.password;
      response.organizerID = organizerCredential.user.uid

      await setDoc(doc(db, "organizer",  organizerCredential.user.uid), response).then((dd)=>{
        console.log(response)
        console.log(dd)
        console.log('dd')

      })
      
          const UniOrganizer = {
            stundetID : organizerCredential.user.uid,
            email: response.email,
            role: response.role,
            clubName: response.clubName,
            name: response.fullName
          }
         
      
      await setDoc(doc(db, `university/${response.universityID}/organizers`,  organizerCredential.user.uid), UniOrganizer).then(()=>{
          console.log(UniOrganizer)
          console.log('sub')
          alert("accout is created you will be redirected to login");
        });
          navigate("/user-auth", { replace: true, state: { from: location } });
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
        <span id="form-title-span"> Tell Us about your club and Uni</span>
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
      <span id="form-title-span"> Set up the New Account</span>
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

export default CreateAdminForm;
