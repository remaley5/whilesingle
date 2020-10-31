import React, { useContext, useState } from "react";
import AddPhotos from "./AddPhotos";
import Button from "@material-ui/core/Button";
import AuthContext from "../../auth";
// import { withStyles } from '@material-ui/core/styles';
import { UserProfileContext } from "../../context/user_profile_context";
import { FrContext } from "../../context/fr_context";

import FrContainer from "../fr_questions/FrContainer";
import FrView from "../fr_questions/FrView";
import FrEdit from "../fr_questions/FrEdit";
import UserInfoView from "./UserInfoView";
// import UserInfoEdit from "./UserInfoEdit";

import EditIcon from "@material-ui/icons/Edit";

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

function Profile() {
  const user = useContext(UserProfileContext);
	const [frUpdated, setFrUpdated] = useState(true)

  // const { setUpdated: setFrUpdated } = useContext(FrContext);
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
  const [updatedFr, setUpdatedFr] = useState({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const defaultPhoto = [
    <div className="default-image" key="default-image"></div>,
  ];

  // console.log(setFrUpdated)
  // console.log(user)
  let {
    first_name,
    last_name,
    bio,
    location,
    preferences,
    gender,
    pronouns,
    photos,
    setUpdated: setProfileUpdated,
  } = user;

  // we're going to add a second level of validation (beyond logging in) that requires user to enter location, preferences, gender, and bio before viewing the full site. Use placeholders for now
  // if (!location) {
  //   location = "Planet Earth";
  // }
  // if (!preferences) {
  //   preferences = ["All of them"];
  // }
  // if (!bio) {
  //   bio = "Tell us about yourself";
  // } else if (bio === " ") {
  //   bio = null;
  // }
  // if (!gender) {
  //   gender = "Human";
  // }
  // if (!pronouns) {
  //   pronouns = "They/Them";
  // }

  const handleFrUpdate = () => {
    // e.preventDefault();
    let url = `/api/questions/fr/${user_id}/answers`;
    let body = {};

    const responseList = Object.entries(updatedFr);

    responseList.forEach(([question_id, response]) => {
      body[question_id] = response;
    });

    console.log(body);

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
		fetchWithCSRF(url, options);
		setFrUpdated(false);

    // clear updatedFr on submit!
    setUpdatedFr({});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const changeEdit = () => {
    if (edit === true) {
      console.log(updatedFr);
      // send updated responses
      handleFrUpdate();
      setProfileUpdated(false);
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const bioObj = {
    fr_question: "About Me",
    fr_answer: bio,
    fr_alt: "Tell us about yourself",
    fr_question_id: "bio",
  };

  const photoElements = photos.map((photo, idx) => (
    <img
      className="pro-body__img"
      src={photo.photo_url}
      alt="profile pic"
      key={idx}
    />
  ));

  return (
    <>
      <Button onClick={changeEdit}>
        {edit ? "View Profile" : "Edit Profile"}
      </Button>
      <div className="pro-con">
        <div className="pro-head">
          {photos.length > 0 ? (
            <img
              className="pro-head__img"
              src={photos[photos.length - 1].photo_url}
              alt="profile pic"
            />
          ) : (
            defaultPhoto
          )}
          <UserInfoView user={user} />
        </div>
        <div className="pro-body-outer">
          <div className="pro-body">
            {edit ? <FrEdit frObj={bioObj} /> : <FrView frObj={bioObj} />}
            <div className="pro-body__img-con">
              {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>edit photos</Button> */}
              {edit ? (
                <EditIcon className="edit-icon" onClick={handleClickOpen} />
              ) : null}
              <div className="pro-body__imgs">{photoElements}</div>
            </div>
            <FrContainer edit={edit} updatedFr={updatedFr} setUpdatedFr={setUpdatedFr} frUpdated={frUpdated}/>
          </div>
        </div>
      </div>
      {edit ? <AddPhotos open={open} setOpen={setOpen} /> : null}
    </>
  );
}

export default Profile;
