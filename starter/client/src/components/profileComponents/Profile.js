import React, { useContext, useState, useEffect } from "react";
import AddPhotos from "./AddPhotos";
import Button from "@material-ui/core/Button";
import AuthContext from "../../auth";
import FrContainer from "../fr_questions/FrContainer";
import FrView from "../fr_questions/FrView";
import FrEdit from "../fr_questions/FrEdit";
import UserInfoView from "./UserInfoView";
import EditIcon from "@material-ui/icons/Edit";

export default function Profile() {
	const defaultPhoto = [
    <img className="pro-head__img" key="default-image" src='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11507092020.png'/>,
	];

  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);

  const [profileUpdated, setProfileUpdated] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoState, setPhotoState] = useState([])
  const useFetch = (user_id) => {
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(`/api/users/${user_id}`);
        const json = await res.json();
        const obj = json[Object.keys(json)];
        console.log(obj.photos)
        setData(obj);
        setLoading(false);
      }
      fetchData();
      setProfileUpdated(true);
    }, [user_id, profileUpdated]);
    return [data, loading];
  };

  const [user, userLoading] = useFetch(user_id);


	const [loadingFr, setLoadingFr] = useState(true)
	const [updatedFr, setUpdatedFr] = useState({});
  const [updatedBio, setUpdatedBio] = useState({});

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

	const handleBioUpdate = () => {
		let url = `/api/users/${user_id}`;
		let body = {bio: Object.values(updatedBio)[0]};
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
		fetchWithCSRF(url, options);
    setUpdatedBio({});
	}


  const handleFrUpdate = () => {
    let url = `/api/questions/fr/${user_id}/answers`;
    let body = {};
    const responseList = Object.entries(updatedFr);
    responseList.forEach(([question_id, response]) => {
      body[question_id] = response;
    });
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
			handleBioUpdate();
			setProfileUpdated(false);
			setLoadingFr(true)
      setEdit(false);
    } else {
			setEdit(true);
			setLoadingFr(false)
    }
  };

  if (userLoading) {
    return "give us a second...";
  }

  let {
    first_name,
    last_name,
    bio,
    location,
    preferences,
    gender,
    pronouns,
    photos,
  } = user;

  user.setProfileUpdated = setProfileUpdated;

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
            {edit ? <FrEdit frObj={bioObj} updatedFr={updatedBio} setUpdatedFr={setUpdatedBio} /> : <FrView frObj={bioObj} />}
            <div className="pro-body__img-con">
              {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>edit photos</Button> */}
              {edit ? ( <div> Upload Photos
                    <EditIcon className="edit-icon" onClick={handleClickOpen} />
                  </div>
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
