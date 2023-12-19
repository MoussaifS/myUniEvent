import { useForm } from "react-hook-form";
import { auth, db } from "../../../FireBase";
import { getAuth,  createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc , setDoc, getDocs , doc, getDoc,  query , where} from "firebase/firestore";
import { useState } from "react";
import PersonalDetails from "./create_user_from/PersonalDetails";
import UniversityDetails from "./create_user_from/UniverstiyDetails";
import PersonalizitionDetails from "./create_user_from/PersonalizitionDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submited, setSubmited] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [response, setResponse] = useState({});
  
  const [uniId, setUniID] = useState(null);

  const auth = getAuth();

  
  

  


  const onSubmit = async (data) => {
    if (errorDate) {
      console.log("Error: Invalid Date");
    } else {
      try {
        const docId = uuidv4();

        const storage = getStorage();
        const imageStorageRef = ref(storage, `events/${data.title}:${docId}`);
        const imageUrlRef = ref(storage, `events/${data.title}:${docId}`);

        await uploadBytes(imageStorageRef, imageUpload).then(() => {
          getDownloadURL(ref(storage, imageUrlRef)).then(async (url) => {
            data.image = url;
            data.email = auth.currentUser.email;
            data.tags = selectedTags;
            data.docId = docId;
            data.audience = audienceType.audience;
            await setDoc(doc(db, "events", docId), data);
          });
        });
        console.log("Document set");
      } catch (error) {
        console.error("Error:", error);
        console.log(data);
      }
    }
  };





  if  (submited){   

    createUserWithEmailAndPassword(auth, response.email, response.password).then(async (userCredential) => {
      
      
      
      console.log("userCredential:", userCredential.uid);

      delete response.password;
        const userId = userCredential.uid;
        await setDoc(doc(db, "users", userId), response);
        


        console.log("in this ")
        // await addDoc(collection(db, `university/1/students`), {
        //   id: response.userId,
        //   email: response.email,
        //   major: response.major,
        // });
        
        navigate("/user-auth", { replace: true, state: { from: location } });
      })
      .catch((error) => console.log(error));
      setSubmited(false);
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
