import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
const PersonalDetails = (props) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleValidation = async () => {
    let errors = {};
    setCurrentStepIndex(0)
    if (!fullName.trim()) {
      errors.fullName = "Full Name cannot be empty";
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number should be 11 digits";
    }
    if (!email.includes("edu") && !email.includes("my")) {
      errors.email = 'Email should contain "edu" or "my"';
      // const dublicateEmailChecker = doc(db, "organizers", "@gmail.com");
      // const dublicateData = await getDoc(dublicateEmailChecker);
      // console.log(dublicateData.exists());Unassigned
    }
    if (password.length < 8) {
      errors.password = "Password should be at least 6 characters";
    }

    setErrors(errors);
    console.log("Validation errors:", errors);

    if (Object.keys(errors).length === 0) {
      props.response({
        phone: phone,
        fullName: fullName,
        email: email,
        password: password,
      });
      props.setCurrentStepIndex(props.currentStepIndex + 1);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  useEffect(() => {
    console.log(props);
    props.setValidated(false);
    if (props.validated) {
      handleValidation();
    }
  }, [props.validated]);

  return (
    <div id="details-forms">
      <TextField
        margin="dense"
        fullWidth
        label="Full Name"
        placeholder="Enter your Full Name"
        value={fullName}
        type="text"
        required
        error={errors.fullName ? true : false}
        helperText={errors.fullName ? "Full Name cannot be empty" : ""}
        onChange={(e) => setFullName(e.target.value)}
      />

      {/* phone */}
      <TextField
        required
        margin="dense"
        type="number"
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
        label="Email"
        fullWidth
        placeholder="Enter E-mail"
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
  
    </div>
  );
};

export default PersonalDetails;
