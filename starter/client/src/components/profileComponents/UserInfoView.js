import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../context/user_profile_context";
import EditIcon from "@material-ui/icons/Edit";
import EditInfo from './EditInfo'

export default function UserInfoView({ edit, user }) {
  const [infoOpen, setInfoOpen] = useState(false)

  // const user = useContext(UserProfileContext);
  let {
    // id,
    first_name,
    last_name,
    bio,
    location,
    preferences,
    gender,
    pronouns,
    // setUpdated,
  } = user;

  const handleClickOpen = () => {
      setInfoOpen(true)
  }

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
      <div className='pro-head__top'>
        <h2 className="pro-head__username">{`${first_name} ${last_name}`}</h2>
        {edit ? (
          <>
            <EditIcon className="edit-icon" onClick={handleClickOpen} />
            {edit ? <EditInfo open={infoOpen} setOpen={setInfoOpen} user={user}/> : null}
          </>
        ) : null}
      </div>
      <h4 className="pro-head__location">{location}</h4>
      <p className="pro-head__pref">Identifies as: {gender[1]}</p>
      <p className="pro-head__pref">Pronouns: {pronouns[1]} pronouns</p>
      <p className="pro-head__pref">Interested in: {preferencesString}</p>
    </div>
  );
}
