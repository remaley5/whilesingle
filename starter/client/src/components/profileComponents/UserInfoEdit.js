import React, {useContext, useState} from "react";
import AuthContext from "../../auth";

export default function UserInfoEdit({ userInfoObj }) {
  // change so you can... edit
	let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
	const []
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
