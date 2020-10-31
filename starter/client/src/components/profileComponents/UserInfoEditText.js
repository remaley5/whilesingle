import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../auth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function UserInfoEditText({ value, label }) {
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
  const classes = useStyles();
  const [val, setVal] = useState(value);
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  useEffect(() => {
    const url = `/api/users/${user_id}`;

    const body =
      label === "First Name"
        ? { first_name: val }
        : label === "Last Name"
        ? { last_name: val }
        : label === "Location"
        ? { location: val }
        : { shit: "is fucked" };

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetchWithCSRF(url, options);
  }, [val]);

  return (
    <div>
      <TextField
        required
        id="standard-name"
        label={label}
        value={val}
        onChange={handleChange}
      />
    </div>
  );
}
