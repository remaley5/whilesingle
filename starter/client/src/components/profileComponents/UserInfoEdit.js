import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../auth";
import UserInfoView from "./UserInfoView";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={personName}
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
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function UserInfoEdit({ userInfoObj }) {
  // change so you can... edit
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
  // const info_options = fetch('/api/users/info_options')
  const [prefOptions, setPrefOptions] = useState(null);
  const [genderOptions, setGenderOptions] = useState(null);
  const [pronounOptions, setPronounOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInfoOptions() {
      const res = await fetch("/api/users/info_options");
      const data = await res.json();
      setPrefOptions(data.preferences);
      setGenderOptions(data.genders);
      setPronounOptions(data.pronouns);
      setLoading(false);
    }
    getInfoOptions();
  }, []);

  console.log(prefOptions, genderOptions, pronounOptions);

  // this makes edit/view transition look seamless
  if (loading) {
    return <UserInfoView userInfoObj={userInfoObj} />;
  }

  const {
    first_name,
    last_name,
    location,
    gender,
    pronouns,
    preferencesString,
  } = userInfoObj;

  return (
    <div className="pro-head__cont">
      <h2 className="pro-head__username">
        <input placeholder="First Name" value={first_name} />
        <input placeholder="Last Name" value={last_name} />
      </h2>
      <h4 className="pro-head__location">{location}</h4>
      <p className="pro-head__pref">Identifies as: {gender}</p>
      <p className="pro-head__pref">Pronouns: {pronouns} pronouns</p>
      <p className="pro-head__pref">Interested in: {preferencesString}</p>
    </div>
  );
}
