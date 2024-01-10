import {
  TextField,
} from "@mui/material";
import { institutionsList } from "../../../../lists/InstitutionList.js";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../FireBase.jsx";
import { useEffect, useState } from "react";

const UniversityDetails = (props) => {
  const [role, setRole] = useState(null);
  const [university, setUniversity] = useState(null);
  const [clubName, setClubName] = useState("");
  const [errors, setErrors] = useState({});
  const [uniID, setUniID] = useState(null); // Assuming initial state is null or an appropriate value


  const fetchUniID = async () => {
    console.log(university)
    if (university === "Independent") {
      setUniID("Independent");
    }
     else {
      try {
        const eventDataQuery = query(
          collection(db, "university"),
          where("uniName", "==", university)
        );

        const eventInfoSnapshot = await getDocs(eventDataQuery);
        eventInfoSnapshot.docs.map((doc) =>  setUniID(doc.id));
      } catch (error) {
        console.log("eat a fat dick and fix it:", error);
      }
    }
  };

  useEffect(()=> {
    fetchUniID()
  } , [university])


  const handleValidation = async () => {
    let errors = {};

    if (university == null) {
      errors.university = "University field cant be Empty";
    }
    if (!clubName.trim()) {
      errors.clubName = "Club Name cannot be empty";
    }

    if (role == null) {
      errors.role = "Select a Role";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      await fetchUniID();
      props.setResponse({
        university: university,
        role: role,
        clubName: clubName,
        universityID: uniID,
      });
      props.setCurrentStepIndex(props.currentStepIndex + 1);      
    } else {
      console.log("Validation errors:", errors);
    }

  };

  return (
    <div id="details-forms">
      <p className="signup-helper-text">Select your University:</p>
      {errors.university ? (
        <span className="form-helper-text-error">{errors.university}</span>
      ) : null}
      <md-outlined-select
        id="text-field-credentials"
        required
        selectIndex="1"
        label="University"
        onInput={(e) => setUniversity(e.target.value)}
      >
        <md-select-option value="Independent" aria-label="Independent">
          <div slot="headline">Independent</div>
        </md-select-option>

        {institutionsList.map((institution, index) => (
          <md-select-option
            key={index}
            value={institution.name}
            aria-label={institution.name}
          >
            <div slot="headline">{institution.name}</div>
          </md-select-option>
        ))}
      </md-outlined-select>

      <TextField
        margin="dense"
        fullWidth
        label="Club Name"
        placeholder="Which Club Do You Represent"
        value={clubName}
        type="text"
        error={errors.clubName ? true : false}
        helperText={errors.clubName ? "Full Name cannot be empty" : ""}
        onChange={(e) => setClubName(e.target.value)}
      />

      <p className="signup-helper-text">Role in Institution is?</p>
      {errors.role ? (
        <span className="form-helper-text-error">{errors.role}</span>
      ) : null}
      <md-outlined-select
        id="text-field-credentials"
        required
        selectIndex="1"
        label="role"
        onInput={(e) => setRole(e.target.value)}
      >
        <md-select-option
          value="University staff member"
          aria-label="University staff member"
        >
          <div slot="headline">University staff member</div>
        </md-select-option>

        <md-select-option
          value="Club Representative"
          aria-label="Club Representative"
        >
          <div slot="headline">Club Representative</div>
        </md-select-option>
      </md-outlined-select>

      <div id="form-btns-navigation">
        <span id="form-btn-next" onClick={handleValidation}>
          Next
        </span>
      </div>
    </div>
  );
};

export default UniversityDetails;
