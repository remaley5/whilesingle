import React, { useContext } from "react";
import { UserProfileContext } from "../../context/user_profile_context";

export default function UserInfoView() {
  const user = useContext(UserProfileContext);
  let {
    id,
    first_name,
    last_name,
    bio,
    location,
    preferences,
    gender,
    pronouns,
    setUpdated,
  } = user;

  let preferencesString = "";
  const numPref = preferences.length;
  for (let i = 0; i < numPref; i++) {
    if (numPref > 1 && i !== numPref - 1) {
      preferencesString += `${preferences[i][1]}, `;
    } else if (numPref === 1) {
      preferencesString += `${preferences[i][1]}`;
    } else {
      preferencesString += `and ${preferences[i][1]} `;
    }
  }

  return (
    <div className="pro-head__cont">
      <h2 className="pro-head__username">{`${first_name} ${last_name}`}</h2>
      <h4 className="pro-head__location">{location}</h4>
      <p className="pro-head__pref">Identifies as: {gender[1]}</p>
      <p className="pro-head__pref">Pronouns: {pronouns[1]} pronouns</p>
      <p className="pro-head__pref">Interested in: {preferencesString}</p>
    </div>
  );
}
