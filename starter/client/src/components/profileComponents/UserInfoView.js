import React from "react";

export default function UserInfoView({ userInfoObj }) {
  const {
    first_name,
    last_name,
    location,
    gender,
    pronouns,
    preferences,
  } = userInfoObj;

  let preferencesString = "";
  for (let i = 0; i < preferences.length; i++) {
    if (i < preferences.length - 1) {
      preferencesString += `${preferences[i][1]}, `;
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
