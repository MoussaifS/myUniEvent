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
    console.log("Validation errors:", errors);

    if (Object.keys(errors).length === 0) {
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
    <div>
      <TextField
        margin="dense"
        fullWidth
        label="Full Name"
        placeholder="Enter ur Full Name "
        value={fullName}
        type="text"
        required
        onChange={(e) => setFullName(e.target.value)}
      ></TextField>
      {errors.fullName && (
        <p className="form-error-helper-text">{errors.fullName}</p>
      )}

      {/* phone */}
      <TextField
        required
        margin="dense"
        type="number"
        label="Phone number"
        placeholder="Enter Phone Number"
        value={phone}
        fullWidth
        onChange={(e) => setPhone(e.target.value)}
      ></TextField>
      {errors.phone && <p className="form-error-helper-text">{errors.phone}</p>}

      {/* email */}
      <TextField
        required
        type="email"
        margin="dense"
        label="Email"
        fullWidth
        placeholder="Enter E-mail"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      {errors.email && <p className="form-error-helper-text">{errors.email}</p>}

      {/* password */}
      <TextField
        type="Password"
        label="Password"
        fullWidth
        margin="dense"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      {errors.password && (
        <p className="form-error-helper-text">{errors.password}</p>
      )}
    </div>
  );
};

export default PersonalDetails;
