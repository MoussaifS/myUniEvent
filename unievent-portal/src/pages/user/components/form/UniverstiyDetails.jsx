import { Select, MenuItem, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import { majorList } from "../../../../lists/MajorList";
import { institutionsList } from "../../../../lists/InstitutionList";

const UniversityDetails = (props) => {
  const [major, setMajor] = useState(null);
  const [university, setUniversity] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleValidation = async () => {
    setErrors(null);
    if ((university || major) == null) {
      setErrors("Select field can't be Empty");
    }

    if (errors === null) {
      props.setCurrentStepIndex(props.currentStepIndex + 1);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  useEffect(() => {
    props.setValidated(false);
    if (props.validated) {
      handleValidation();
    }
  }, [props.validated]);

  console.log(university);
  return (
    <div>
      <Select
        label="Select Major"
        fullWidth
        onChange={(e) => setUniversity(e.target.value)}
      >
        {institutionsList.map((institution, index) => (
          <MenuItem
            key={index}
            value={institution.name}
            aria-label={institution.name}
          >
            <div slot="headline">{institution.name}</div>
          </MenuItem>
        ))}
      </Select>

      <p>select your uni</p>
      <FormHelperText>Choose the closest major</FormHelperText>
      <Select label="Select Major" fullWidth>
        {majorList.map((e, index) => (
          <MenuItem key={index} value={e.major} aria-label={e.major}>
            <div slot="headline">{e.major}</div>
          </MenuItem>
        ))}
      </Select>
      {errors && <p className="form-error-helper-text">{errors}</p>}
    </div>
  );
};

export default UniversityDetails;
