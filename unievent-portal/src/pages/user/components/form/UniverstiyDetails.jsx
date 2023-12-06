import { TextField } from "@mui/material";
import { useState , useEffect } from "react";
import "@material/web/select/select-option.js";
import "@material/web/select/outlined-select.js";
import { majorList } from "../../../../lists/MajorList";
import { institutionsList } from "../../../../lists/InstitutionList";


const UniversityDetails = (props) => {
    return(
        <div>
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
            >
              <div slot="headline">{institution.name}</div>
            </md-select-option>
          ))}
        </md-outlined-select>
        </div>
        
    )

}

export default UniversityDetails;
