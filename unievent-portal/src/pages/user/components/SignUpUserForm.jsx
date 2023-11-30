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
    <div>
      <div style={currentStepIndex == 2 ? {} : { display: "none" }}>2</div>
      <form>
        <div style={currentStepIndex == 0 ? {} : { display: "none" }}>
          <span> Set up a new account </span>
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
          <button onClick={next}>next</button>
        </div>

        <div style={currentStepIndex == 1 ? {} : { display: "none" }}>
          <span>What is your current major? Choose the closest one</span>
          <span>Choose the closest</span>

          <select>
            <options> business</options>
            <options> Computer & It</options>

            <options> BioTech</options>
            <options> Engineering</options>
          </select>

          <button onClick={back}>back</button>
          <button onClick={next}>next</button>
        </div>


        <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
        <span>How would you describe the type of event you prefer? </span>
        <span></span>

        <span>age</span>
        <span>gender</span>
        <span>universtiy </span>

        <button onClick={back}>back</button>
        <button onClick={next}>next</button>

        </div>

        <div style={currentStepIndex == 2 ? {} : { display: "none" }}>
          <span>How would you describe the type of event you prefer? </span>
          <span></span>
        </div>
      </form>
    </div>
  );
};

export default SignUpUserForm;
