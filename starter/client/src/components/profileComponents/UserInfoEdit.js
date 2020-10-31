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
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { TextField, NativeSelect, Select } from "@material-ui/core";

import MultipleSelect from './UserInfoEditMultiSelect'

export default function UserInfoEdit({ userInfoObj }) {
  // change so you can... edit
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
  // const info_options = fetch('/api/users/info_options')
  const [prefOptions, setPrefOptions] = useState(null);
  const [genderOptions, setGenderOptions] = useState(null);
  const [pronounOptions, setPronounOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  // move this to user context... later
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
    preferences,
  } = userInfoObj;

  return (
    <div className="pro-head__cont">
      <h2 className="pro-head__username">
        <TextField id="first_name" label="First Name" value={first_name} />
        <TextField id="last_name" label="Last Name" value={last_name} />
      </h2>
      <h4 className="pro-head__location">
        <TextField id="location" label="Location" value={location} />
      </h4>
      <div className="pro-head__pref">
        <MultipleSelect options={prefOptions} selected={preferences} label='Preferences' />
        Identifies as: {gender}
      </div>
      <div className="pro-head__pref">
        <NativeSelect options={pronounOptions} />
        Pronouns: {pronouns} pronouns
      </div>
      <div className="pro-head__pref">
        <NativeSelect options={genderOptions} />
        Interested in: {preferences}
      </div>
    </div>
  );
}
