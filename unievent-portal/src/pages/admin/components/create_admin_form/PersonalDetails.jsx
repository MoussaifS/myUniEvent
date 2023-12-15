import { TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../../../FireBase";

const PersonalDetails = (props) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function back() {
    props.setCurrentStepIndex(props.currentStepIndex - 1);
  }

  const handleValidation = async () => {
    let errors = {};

    const citiesRef = collection(db, "organizers");
    const q = query(citiesRef, where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.log("Document with the specified email exists");
        errors.registeredEmail =
          "The email address is already in use. Please try a different email";
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
    }

    if (!fullName.trim()) {
      errors.fullName = "Full Name cannot be empty";
    }
    if (phone.length < 10 || phone.length > 10) {
      errors.phone = "Phone number should be 10 digits";
    }
    if (!email.includes("@") ) {
      errors.email = 'Email Unvalid';
    }
    if (password.length < 8) {
      errors.password = "Password should be at least 6 characters";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      props.setResponse({
        ...props.response,
        phone: phone,
        fullName: fullName,
        email: email,
        password: password,
      });
    } else {

      console.log("Validation errors:", errors);
    }
  };

  return (
    <div id="details-forms">
      <TextField
        margin="dense"
        fullWidth
        label="Full Name"
        placeholder="Enter your Full Name"
        value={fullName}
        type="text"
        error={errors.fullName ? true : false}
        helperText={errors.fullName ? "Full Name cannot be empty" : ""}
        onChange={(e) => setFullName(e.target.value)}
      />

      {/* phone */}
      <TextField
        required
        margin="dense"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">+60</InputAdornment>,
        }}
        label="Phone number"
        placeholder="Enter Phone Number"
        value={phone}
        fullWidth
        error={errors.phone ? true : false}
        helperText={errors.phone ? "Phone number should be 11 digits" : ""}
        onChange={(e) => setPhone(e.target.value)}
      ></TextField>

      {/* email */}
      <TextField
        required
        type="email"
        margin="dense"
        label="Universty Email"
        fullWidth
        placeholder="email@my.edu"
        error={errors.email ? true : false}
        helperText={
          errors.email ? 'Please use an email with ".edu" or "my" domain.' : ""
        }
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      {errors.registeredEmail ? (
        <span className="form-helper-text-error">{errors.registeredEmail}</span>
      ) : null}

      {/* password */}
      <TextField
        type="Password"
        label="Password"
        fullWidth
        margin="dense"
        placeholder="Enter Password"
        error={errors.password ? true : false}
        helperText={
          errors.password ? "Password must have a minimum of 8 characters." : ""
        }
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <div id="form-btns-navigation">
        <span id="form-btn-next" onClick={handleValidation}>
          Create Account
        </span>
        <span id="form-btn-back" onClick={back}>
          Back
        </span>
      </div>
    </div>
  );
};

export default PersonalDetails;
