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

const SignUp = () => {
  const { handleSubmit, register } = useForm();
  const [step , setStep] = useState(1)
 
  const prevStep = () => {
    setStep(step - 1 );
  }

  const nextStep = () => {
    setStep(step + 1 );
  }






  const institutions = [
    { name: "Universiti Sains Islam Malaysia" },
    { name: "Manipal International University" },
    { name: "Nilai University" },
    { name: "INTI International University" },
    { name: "Other" },
  ];

  const roles = [
    { role: "University staff member" },
    { role: "Student Club Representative" },
  ];

  const onSubmit = (e) => {
    console.log(e);
    createUserWithEmailAndPassword(auth, e.email, e.password)
      .then(async (userCredential) => {
        delete e.password;
        await addDoc(collection(db, "organizers"), e);
        alert("accout is created you will be redirected to login");
        window.location.reload(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* fisrt Name */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("first-name")}
          required
          maxlength="10"
          minlength="2"
          label="Name"
          placeholder="Enter First Name "
        ></md-outlined-text-field>

        {/* last name */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("last-name")}
          required
          minlength="2"
          maxlength="10"
          label="Last Name"
          placeholder="Enter Last Name "
        ></md-outlined-text-field>

        {/* phone */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("phone")}
          required
          type="number"
          label="Phone number"
          maxlength="10"
          minlength="2"
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

        <md-divider></md-divider>

        {/* institution name */}
        <h4>Select the closer option</h4>
        <md-outlined-select
          id="text-field-credentials"
          required
          selectIndex="1"
          label="Select Institution"
        >
          {institutions.map((e) => (
            <md-select-option
              key={e.id}
              value={e.name}
              aria-label={e.name}
              {...register("institution")}
            >
              <div slot="headline">{e.name}</div>
            </md-select-option>
          ))}
        </md-outlined-select>

        {/* Role */}

        <md-outlined-select
          id="text-field-credentials"
          required
          selectIndex="1"
          label="Role in Institution"
        >
          {roles.map((e) => (
            <md-select-option
              id="text-field-credentials"
              key={e.id}
              value={e.role}
              aria-label={e.role}
              {...register("role")}
            >
              <div slot="headline">{e.role}</div>
            </md-select-option>
          ))}
        </md-outlined-select>

        {/* email */}
        <md-outlined-text-field
          id="text-field-credentials"
          {...register("representing")}
          required
          type="text"
          label="I Represent..."
          supporting-text="Which club do you with Represent"
        ></md-outlined-text-field>

        <div>
          <md-outlined-button id="button">
            Create new account
          </md-outlined-button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
