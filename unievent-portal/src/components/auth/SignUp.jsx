import { Container, TextField, Grid, Paper, Button } from "@mui/material";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { auth, db } from "../../FireBase";
import { createUserWithEmailAndPassword, reload } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useLocation, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";

const SignUp = () => {
  const { control, handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("");

  const institutions = [
    { name: "Universiti Sains Islam Malaysia" },
    { name: "Manipal International University" },
    { name: "Nilai University" },
    { name: "INTI International University" },
  ];

  const roles = [
    { role: "Student Advisor" },
    { role: "Student Club Advisor" },
    { role: "Student Club Representative" },
  ];

  const onSubmit = (e) => {
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
            label="Name"
            placeholder="Enter First Name "
          ></md-outlined-text-field>

          {/* last name */}
          <md-outlined-text-field
            id="text-field-credentials"
            {...register("last-name")}
            required
            label="Last Name"
            placeholder="Enter Last Name "
          ></md-outlined-text-field>

          {/* phone */}
          <md-outlined-text-field
            id="text-field-credentials"
            {...register("phone")}
            required
            defaultValue="+60"
            type="number"
            label="Phone number"
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

          {/* uni name */}
          <div></div>

          <div>
            <Controller
              name="institution"
              placeholder="Institution Name"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Institution Name "
                  options={institutions.map((institution) => ({
                    value: institution.name,
                    label: institution.name,
                  }))}
                />
              )}
            />
          </div>

          {/* Role */}

          <div>
          <br/>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    placeholder="Your Role In This Institution"
                    {...field}
                    options={roles.map((role) => ({
                      value: role.role,
                      label: role.role,
                    }))}
                  />
                  {field.value &&
                    field.value.value === "Student Club Representative" && (
                      <div>
                        <md-outlined-text-field
                          id="text-field-credentials"
                          {...register("email")}
                          required
                          type="text"
                          label="Club Name"
                        ></md-outlined-text-field>
                      </div>
                    )}
                </div>
              )}
            />
          </div>

          <div>
          <md-outlined-button id="button"> Create new account </md-outlined-button>
          </div>
        </form>
    </div>
  );
};

export default SignUp;
