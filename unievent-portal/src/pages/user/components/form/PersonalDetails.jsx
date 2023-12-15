import { TextField ,InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, addDoc ,where  , query,getDoc , doc } from "firebase/firestore";
import { auth, db } from "../../../../FireBase";

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

    // let eventInfoSnapshot = null
    // try {
    //   const eventDataQuery =  query(
    //     collection(db, "organizers"),
    //     where("email", "==", "dd@dd.com"),
    //   );
    //    eventInfoSnapshot = await getDoc(eventDataQuery);
    //    console.log("a" , eventInfoSnapshot)
    // } catch (error) {
    //   console.log("An error occurred:", error);
    // }


      //  const dublicateEmailChecker =await doc(db, "organizers", "dd@dd.com");
      //  console.log("1",dublicateEmailChecker)
      //  const dublicateData = await getDoc(dublicateEmailChecker);
      //  console.log("2", dublicateData)
      //  if (eventInfoSnapshot.exists()) {
      //   console.log('Document with email exists');
      //   // Handle the case when the document with the email already exists
      // } else {
      //   console.log('Document with email does not exist');
      //   // Handle the case when the document with the email does not exist
      // }
    
    let errors = {};
    if (!fullName.trim()) {
      errors.fullName = "Full Name cannot be empty";
    }
    if (phone.length < 10 ||phone.length > 10  ) {
      errors.phone = "Phone number should be 10 digits";
    }
    if (!email.includes("edu") && !email.includes("my")) {
      errors.email = 'Email should contain "edu" or "my"';
    }
    if (password.length < 8) {
      errors.password = "Password should be at least 6 characters";
    }
    setErrors(errors);
    console.log("Validation errors:", errors);

    if (Object.keys(errors).length === 0) {
       props.setResponse({
        ...props.response,
        phone: phone,
        fullName: fullName,
        email: email,
        password: password
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
        helperText={errors.phone ? "Phone number should be 11 digits": ""}
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
        helperText={errors.email ? 'Please use an email with ".edu" or "my" domain.': ""}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>

      {/* password */}
      <TextField
        type="Password"
        label="Password"
        fullWidth
        margin="dense"
        placeholder="Enter Password"
        error={errors.password ? true : false}
        helperText={errors.password ? 'Password must have a minimum of 8 characters.': ""}
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
