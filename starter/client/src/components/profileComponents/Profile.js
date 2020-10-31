import React, { useContext, useState } from "react";
import AddPhotos from "./AddPhotos";
import Button from "@material-ui/core/Button";
import AuthContext from "../../auth";
import { UserProfileContext } from "../../context/user_profile_context";
import FrContainer from "../fr_questions/FrContainer";
import FrView from "../fr_questions/FrView";
import FrEdit from "../fr_questions/FrEdit";
import UserInfoView from "./UserInfoView";
import EditIcon from "@material-ui/icons/Edit";

export default function Profile() {
	const defaultPhoto = [
    <div className="default-image" key="default-image"></div>,
	];

	const user = useContext(UserProfileContext);
	const [loadingFr, setLoadingFr] = useState(true)

  // const { setUpdated: setFrUpdated } = useContext(FrContext);
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
  const [updatedFr, setUpdatedFr] = useState({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);


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
			setLoadingFr(true)
      setEdit(false);
    } else {
			setEdit(true);
			setLoadingFr(false)
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
          <UserInfoView edit={edit} user={user} />
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
            <FrContainer edit={edit} updatedFr={updatedFr} setUpdatedFr={setUpdatedFr} loadingFr={loadingFr} setLoadingFr={setLoadingFr}/>
          </div>
        </div>
      </div>
      {edit ? <AddPhotos open={open} setOpen={setOpen} /> : null}
    </>
  );
}
