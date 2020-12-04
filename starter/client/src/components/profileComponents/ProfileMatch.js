import React, { useState, useEffect } from "react";
import FrMatchContainer from "../fr_questions/FrMatchContainer";
import FrView from "../fr_questions/FrView";
import UserInfoView from "./UserInfoView";
import LoadingPage from '../loading';

export default function ProfileMatch({ otherUserId }) {
  const defaultPhoto = [
    <div className="default-image pro-head__img" key="default-image"></div>,
  ];

  // we'll also need a match id to load their answered questions only
  // const match_id = 2;
  const updated = useState(true);
	const setUpdated = updated[1]
	const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const useFetch = (otherUserId) => {
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(`/api/users/${otherUserId}`);
        const json = await res.json();
        // call returns object with one key - we only want its value (an array)
        const obj = json[Object.keys(json)];
        setData(obj);
        setLoading(false);
      }
      fetchData();
      setUpdated(true);
    }, [otherUserId]); //updated
    return [data, loading];
  };

  const [matchProfile, matchProfileLoading] = useFetch(otherUserId);

  if (matchProfileLoading) {
    return <LoadingPage string="Loading your life partner's profile, one sec..."/>;
  }

  let {
    // first_name,
    // last_name,
    bio,
    // location,
    // preferences,
    // gender,
    // pronouns,
    photos,
  } = matchProfile;

  // console.log(matchProfile);

  const photoElements = photos.map((photo, idx) => (
    <img
      className="pro-body__img"
      src={photo.photo_url}
      alt="profile pic"
      key={idx}
    />
  ));

  // console.log('PHOTOELEMENTS', photoElements)

  const bioObj = bio ? {
    fr_question: "About Me",
    fr_answer: bio,
    fr_alt: "Tell us about yourself",
    fr_question_id: "bio",
  } : null;

  return (
    <>
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
          <UserInfoView user={matchProfile} />
        </div>
        <div className="pro-body-outer">
          <div className="pro-body">
            {bioObj ? <FrView frObj={bioObj} /> : null }
            {photoElements.length >= 1 ?
            <div className="pro-body__img-con">
              <div className="pro-body__imgs">{photoElements}</div>
            </div> : null
}
            <FrMatchContainer otherUserId={otherUserId} />
          </div>
        </div>
      </div>
    </>
  );
}
