import React, { useContext, useState } from "react";
import AddPhotos from "./AddPhotos";
import Button from "@material-ui/core/Button";
import AuthContext from "../../auth";
import AuthContext from '../../auth'

// import { withStyles } from '@material-ui/core/styles';
import { UserProfileContext } from "../../context/user_profile_context";
import { FrContext } from "../../context/fr_context";

import Fr from "../../views/Fr";
import FrView from "../fr_questions/FrView";
import FrEdit from "../fr_questions/FrEdit";
import UserInfoView from "./UserInfoView";
import UserInfoEdit from "./UserInfoEdit";

import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function Profile() {
	const user = useContext(UserProfileContext);
  const {setUpdated: setFrUpdated} = useContext(FrContext)
  const { fetchWithCSRF, currentUserId:user_id } = useContext(AuthContext);
	console.log(setFrUpdated)
  console.log(user)
  let {
    first_name,
    last_name,
    bio,
    // location,
    // preferences,
    // gender,
		// pronouns,
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
    let body = {}

    const responseList = Object.entries(updatedFr)

    responseList.forEach(([question_id, response])=>{
      body[question_id] = response;
    })

    // let body = { question_id: fr_question_id, response };

    // if (fr_question_id === "bio") {
    //   url = `/api/users/${user_id}`;
    //   body = { bio: response };
    // }

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetchWithCSRF(url, options);
    // clear updatedFr on submit!
    setUpdatedFr({})
  };

  console.log(updatedFr)

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [edit, setEdit] = useState(false);
  const [updatedFr, setUpdatedFr] = useState({})

  const changeEdit = () => {
		if (edit === true) {
      console.log(updatedFr)
      // send updated responses
      handleFrUpdate()
      setProfileUpdated(false)
			setFrUpdated(false)
			setEdit(false)
		} else {
      setEdit(true)

		}
  };

  const bioObj = {
    fr_question: "About Me",
    fr_answer: bio,
    fr_alt: "Tell us about yourself",
    fr_question_id: "bio",
  };

  const photoElements = photos.map((photo) =>
  <img className='pro-body__img' src={photo.photo_url} alt='profile picture' key={photo.photo_url}/>)

  return (
    <>
      <Button onClick={changeEdit}>
        {edit ? "View Profile" : "Edit Profile"}
      </Button>
      <div className="pro-con">
        <div className="pro-head">
          <img
            className="pro-head__img"
            src={photos[photos.length -1].photo_url}
            alt='profile picture'
          />
          <UserInfoView />
        </div>
        <div className="pro-body-outer">
          <div className="pro-body">
            {edit ? <FrEdit frObj={bioObj} /> : <FrView frObj={bioObj} />}
            <div className="pro-body__img-con">
              {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>edit photos</Button> */}
              {edit ? (
                <EditIcon className="edit-icon" onClick={handleClickOpen} />
              ) : null}
              <div className="pro-body__imgs">
                {photoElements}
              </div>
            </div>
            <Fr edit={edit} />
          </div>
        </div>
      </div>
      {edit ? <AddPhotos open={open} setOpen={setOpen} /> : null}
    </>
  );
}
export default Profile;
