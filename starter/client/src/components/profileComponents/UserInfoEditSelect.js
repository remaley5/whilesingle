import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../auth";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function UserInfoEditSelect({ options, selected, label }) {
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);

  const classes = useStyles();
  const [val, setVal] = useState(selected[0]);

  const handleChange = (event) => {
    setVal(event.target.value);
	};

	useEffect(()=>{
		const url = `/api/users/${user_id}`;

		const body = (label === 'Gender') ? {gender_id: val} :{pronoun_id: val};

		const options = {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};
		fetchWithCSRF(url, options);
	}, [val])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor={label}>
        {label}
      </InputLabel>
      <NativeSelect
        value={val}
        onChange={handleChange}
        inputProps={{id: label}}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option[0]}>
            {option[1]}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
