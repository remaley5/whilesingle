import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../auth";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import { TextField, NativeSelect, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ options, selected, label }) {
	let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
	let optionVals = options.map(([id, value])=>{
		return value
	})
  let selectedVals = selected.map(([id, value]) => {
    return value;
  });
  const classes = useStyles();
  const theme = useTheme();
  const [val, setVal] = React.useState(selectedVals);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { selected } = event.target;
    const value = [];
    for (let i = 0, l = selected.length; i < l; i += 1) {
      if (selected[i].selected) {
        value.push(selected[i].value);
      }
    }
    setVal(value);
  };
	console.log(val);

	useEffect(()=>{
		const url = `/api/users/${user_id}`;
		let preference_ids = []
		for(let i = 0; i < val.length; i ++) {
			const value = val[i]
			const id = optionVals.indexOf(value)
			preference_ids.push(id + 1)
		}
		const body = JSON.stringify({
			preferences: preference_ids,
		});
		const options = {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body,
		};
		fetchWithCSRF(url, options);
	}, [val])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={val}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option, idx) => (
          <MenuItem
            key={idx}
            id={option[0]}
            value={option[1]}
            style={getStyles(option[1], val, theme)}
          >
            {option[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
