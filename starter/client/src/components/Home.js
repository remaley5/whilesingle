import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../auth";
// import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ClearIcon from "@material-ui/icons/Clear";
import { iconTheme } from "../styles/homeThemes";
import { NavLink } from "react-router-dom";
import LoadingPage from "./loading";

function Home(props) {
  const iconClass = iconTheme();

  const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
  const [userBank, setUserBank] = useState([]);
  const [viewingUser, setViewingUser] = useState([]);
  const [index, setIndex] = useState();
  const [matchPercent, setMatchPercent] = useState();
  const [likedOpen, setLikedOpen] = useState(false);
	const [rejectOpen, setRejectOpen] = useState(false);
	const [loading, setLoading] = useState(true)

  let user = "You've swiped on everyone! Time to go outside";

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/matches/swipe/${currentUserId}`);
      const data = await res.json();
      if (data.length > 0) {
        const resForPercent = await fetch(
          `/api/questions/mc/user/${currentUserId}/match/${data[0].user.id}`
        );
        const dataForPercent = await resForPercent.json();
        setMatchPercent(dataForPercent.match_percent);
        setIndex(0);
      }
      setUserBank(data);
      setViewingUser([data[0]]);
			setLoading(false)
		})();
  }, [currentUserId]);

  const getMoreSwipes = async () => {
    const res = await fetch(`/api/matches/swipe/${currentUserId}`);
    const data = await res.json();
    setUserBank(data);
    setViewingUser([data[0]]);
    setIndex(0);
  };

  const handleSwipe = async () => {
    const swipe_id = viewingUser[0].user.id;
    if (index >= userBank.length - 1) {
      getMoreSwipes();
    } else {
      setIndex(index + 1);
      setViewingUser([userBank[index + 1]]);
    }
    const resForPercent = await fetch(
      `/api/questions/mc/user/${currentUserId}/match/${swipe_id}`
    );
    const dataForPercent = await resForPercent.json();
    setMatchPercent(dataForPercent.match_percent);
    return swipe_id;
  };

  const updateDatabase = (url, user_id) => {
    const body = JSON.stringify({ user_id: user_id });
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    fetchWithCSRF(url, options);
  };

  const reject = async () => {
    setRejectOpen(true);
    setTimeout(() => {
      setRejectOpen(false);
    }, 500);
    const reject_id = await handleSwipe();
    const url = `/api/matches/reject/${currentUserId}`;
    updateDatabase(url, reject_id);
  };

  const accept = async () => {
    setLikedOpen(true);
    setTimeout(() => {
      setLikedOpen(false);
    }, 500);
    const accept_id = await handleSwipe();
    const url = `/api/matches/add-match/${currentUserId}`;
    updateDatabase(url, accept_id);
	};

  if (viewingUser[0]) {
    user = viewingUser.map(({ user }, idx) => {
      let photos = user.photos.map((photo, idx2) => (
        <img
          className="swipe-img"
          src={photo.photo_url}
          alt="profile pic"
          key={`${idx}-${idx2}`}
        />
      ));
      const userPreferences = user.preferences.map(
        ([preference_id, preference]) => preference
      );
      const preferences = userPreferences.join(",  ");
      if (photos.length <= 0) {
        photos = [<div key={0} className="default-image"></div>];
      }
      return (
        <>
          <div className="page-con">
            <div
              className="swipe-con"
              key={idx}
              style={likedOpen || rejectOpen ? { display: "none" } : null}
            >
              <div className="content-con">
                <div className="swipe-img-con">{photos}</div>
                <div className="swipe-con__right">
                  <div className="swipe__info">
                    <h3 className="swipe-info__head">{user.first_name}</h3>
                    <h4 className="swipe-info__sub-head">{user.location}</h4>
                    <p className="info gender">
                      {user.gender[1]}, {user.pronouns[1]}
                    </p>
                    <div className="info prefs">{preferences} </div>
                    <div className="info percent-match">{`Match: ${matchPercent}%`}</div>
                    <p className="swipe-bio">{user.bio}</p>
                  </div>
                </div>
              </div>
              <div className="swipe-btns">
                <div className="swipe-icons">
                  <ClearIcon className={iconClass.nope} onClick={reject} />
                  <FavoriteIcon className={iconClass.heart} onClick={accept} />
                </div>
                <NavLink className="prof-btn" to={`/profile/${user.id}`}>
                  View Profile
                </NavLink>
              </div>
            </div>
            <dialog className="swipe-alert yes" open={likedOpen}>
              Yes!
            </dialog>
            <dialog className="swipe-alert no" open={rejectOpen}>
              Nope!
            </dialog>
          </div>
        </>
      );
    });
    return user;
  } else if (loading) {
    return <LoadingPage string={"Finding your life partner..."} />;
  } else {
		return <LoadingPage string={"You've swiped on everyone! Time to go outside"} />;
	}
}
export default Home;
