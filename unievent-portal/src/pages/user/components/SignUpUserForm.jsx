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

const SignUpUserForm = () => {
  const { handleSubmit, register } = useForm();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(currentStepIndex + 1);
  }

  function back() {
    setCurrentStepIndex(currentStepIndex - 1);
  }

  console.log(currentStepIndex);

  return (
    <form id="">
      <div style={currentStepIndex == 0 ? {} : { display: "none" }}>
        <span id="formSpan"> Set up a new account </span>
        {/* full Name */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("full name")}
          required
          maxlength="20"
          minlength="2"
          label="Name"
          placeholder="Enter ur Full Name "
        ></md-outlined-text-field>

        {/* phone */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("phone")}
          required
          type="number"
          label="Phone number"
          maxlength="10"
          minlength="10"
          placeholder="Enter Phone Number"
        ></md-outlined-text-field>

        {/* email */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("email")}
          required
          type="email"
          label="Email"
          placeholder="Enter E-mail"
        ></md-outlined-text-field>

        {/* password */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("password")}
          required
          type="Password"
          label="Password"
          placeholder="Enter Password"
        ></md-outlined-text-field>
        <div id="formNavBtns">
          <span id="formNextBtn" onClick={next}>
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
        <span>How would you describe the type of event you prefer? </span>
        <span></span>

        <span>age</span>
        <span>gender</span>

        <button onClick={back}>back</button>
        <button onClick={next}>next</button>
      </div>

      <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
        <span>How would you describe the type of event you prefer? </span>
        <span></span>
      </div>
    </form>
  );
};

export default SignUpUserForm;
