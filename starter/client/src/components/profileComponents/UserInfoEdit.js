import React, { useContext } from "react";
import { UserProfileContext } from "../../context/user_profile_context";
// import { TextField } from "@material-ui/core";
import { UserProfileInfoContext } from "../../context/user_profile_info_context";
import MultipleSelect from "./UserInfoEditMultiSelect";
import SingleSelect from "./UserInfoEditSelect";
import TextField from './UserInfoEditText'
export default function UserInfoEdit() {
	const {prefOptions, genderOptions, pronounOptions} = useContext(UserProfileInfoContext);
  const user = useContext(UserProfileContext);
	const {
    first_name,
    last_name,
    location,
    preferences,
    gender,
		pronouns,
		setUpdated
  } = user;

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
        <SingleSelect
          options={genderOptions}
          selected={gender}
          label="Gender"
        />
      </div>
      <div className="pro-head__pref">
        <SingleSelect
          options={pronounOptions}
          selected={pronouns}
          label="Pronouns"
        />
      </div>
      <div className="pro-head__pref">
        <MultipleSelect
          options={prefOptions}
          selected={preferences}
          label="Preferences"
        />
      </div>
    </div>
  );
}
