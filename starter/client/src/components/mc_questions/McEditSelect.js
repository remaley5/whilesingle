import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
// import { makeStyles } from "@material-ui/core/styles";

// the useStyles stuff is from material-ui - don't know how ot use it

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function NativeSelects({ props }) {
  // const classes = useStyles();
  const { name, id, value, options, handleChange } = props;

  return (
    <FormControl
    // className={classes.formControl}
    >
      <InputLabel shrink htmlFor={id}>
        Importance
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleChange}
        inputProps={{ name, id }}
      >
        {options.map(([value, text], idx) => (
          <option key={idx} value={value}>
            {text}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
