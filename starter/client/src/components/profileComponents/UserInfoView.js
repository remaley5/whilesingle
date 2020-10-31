import React from "react";

export default function UserInfoView({ userInfoObj }) {
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
      <h2 className="pro-head__username">{`${first_name} ${last_name}`}</h2>
      <h4 className="pro-head__location">{location}</h4>
      <p className="pro-head__pref">Identifies as: {gender}</p>
      <p className="pro-head__pref">Pronouns: {pronouns} pronouns</p>
      <p className="pro-head__pref">Interested in: {preferencesString}</p>
    </div>
  );
}
