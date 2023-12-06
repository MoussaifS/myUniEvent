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
import { majorList } from "../../../lists/MajorList";
import { institutionsList } from "../../../lists/InstitutionList";
import { eventTagList } from "../../../lists/EventTagsList";
import "@material/web/chips/filter-chip.js";
import { TextField } from "@mui/material";
import NewAccountValidation from './NewAccountValidation' 
// import {
//   query,
//   where,
//   getDocs,
//   doc,
//   getDoc,
//   orderBy,
//   limit,
// } from "firebase/firestore";

const SignUpUserForm = () => {
  const { handleSubmit, register } = useForm();
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [shit, setShit] = useState(0);

  
  const handleNewAccountValidation = async () => {
    let errors = {};
    console.log(fullName);
    if (!fullName.trim()) {
      errors.fullName = "Full Name cannot be empty";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number should be 10 digits";
    }

    if (!email.includes("edu") && !email.includes("my")) {
      errors.email = 'Email should contain "edu" or "my"';

      // const dublicateEmailChecker = doc(db, "organizers", "@gmail.com");
      // const dublicateData = await getDoc(dublicateEmailChecker);

      // console.log(dublicateData.exists());
    }

    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      next();
    } else {
      console.log("Validation errors:", errors);
    }
  };

  function next() {
    setCurrentStepIndex(currentStepIndex + 1);
  }

  function back() {
    setCurrentStepIndex(currentStepIndex - 1);
  }

  const onSubmit = (e) => {
    console.log("in ", e);

    // createUserWithEmailAndPassword(auth, e.email, e.password)
    //   .then(async (userCredential) => {
    //     delete e.password;
    //     await addDoc(collection(db, "organizers"), e);
    //     alert("accout is created you will be redirected to login");
    //     window.location.reload(true);
    //   })
    //   .catch((error) => console.log(error));
  };

  const handleThisShit = ()=>{
    setShit(shit + 1)
    console.log(shit)
  }


  return (
    <form id="form-container">


    <NewAccountValidation handleThisShit={handleThisShit}/>

      <div style={currentStepIndex == 0 ? {} : { display: "none" }}>
        <span id="formSpan"> Set up a new account </span>
        {/* full Name */}
        <TextField
          fullWidth
          label="Full Name"
          placeholder="Enter ur Full Name "
          value={fullName}
          type='text'
          onChange={(e) => setFullName(e.target.value)}
        ></TextField>
        {errors.fullName && (
          <p className="form-error-helper-text">{errors.fullName}</p>
        )}


        {/* phone */}
        <TextField
          required
          type="number"
          label="Phone number"
          placeholder="Enter Phone Number"
          value={phone}
          fullWidth
          onChange={(e) => setPhone(e.target.value)}
        ></TextField>
        {errors.phone && (
          <p className="form-error-helper-text">{errors.phone}</p>
        )}

        {/* email */}
        <TextField
          required
          type="email"
          label="Email"
          fullWidth
          placeholder="Enter E-mail"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        {errors.email && (
          <p className="form-error-helper-text">{errors.email}</p>
        )}

        {/* password */}
        <TextField
          type="Password"
          label="Password"
          fullWidth
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        {errors.password && (
          <p className="form-error-helper-text">{errors.password}</p>
        )}

        <div id="formNavBtns">
          <span id="formNextBtn" onClick={handleNewAccountValidation}>
            Next
          </span>
        </div>
      </div>

      <div style={currentStepIndex == 1 ? {} : { display: "none" }}>
        <span id="formSpan">What is your Current major?</span>

        <md-outlined-select
          id="text-field-credentials"
          required
          selectIndex="1"
          label="Select Major"
        >
          {majorList.map((e, index) => (
            <md-select-option
              key={index}
              value={e.major}
              aria-label={e.major}
              {...register("major")}
            >
              <div slot="headline">{e.major}</div>
            </md-select-option>
          ))}
        </md-outlined-select>

        <md-outlined-select
          id="text-field-credentials"
          required
          selectIndex="1"
          label="Select Your University"
        >
          {institutionsList.map((institution, index) => (
            <md-select-option
              key={index}
              value={institution.name}
              aria-label={institution.name}
              {...register("institution")}
            >
              <div slot="headline">{institution.name}</div>
            </md-select-option>
          ))}
        </md-outlined-select>

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
