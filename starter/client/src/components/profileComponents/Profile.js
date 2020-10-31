import React, { useContext, useState } from "react";
import AddPhotos from "./AddPhotos";
import Button from "@material-ui/core/Button";
// import { withStyles } from '@material-ui/core/styles';
import { UserProfileContext } from "../../context/user_profile_context";
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
  let {
    bio,
    // location,
    // preferences,
    // gender,
		// pronouns,
		setUpdated
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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [edit, setEdit] = useState(false);

  const changeEdit = () => {
		if (edit === true) {
			setUpdated(false)
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

  return (
    <>
      <Button onClick={changeEdit}>
        {edit ? "View Profile" : "Edit Profile"}
      </Button>
      <div className="pro-con">
        <div className="pro-head">
          <img
            className="pro-head__img"
            src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
          />
          {edit ? (
            <UserInfoEdit />
          ) : (
            <UserInfoView />
          )}
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
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
                <img
                  className="pro-body__img"
                  src="https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg"
                />
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
