import React, { useContext, useState, useEffect} from 'react';
import AuthContext from '../auth'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import { iconTheme } from '../styles/homeThemes';

const defaultImage = 'https://while-single-bucket.s3-us-west-2.amazonaws.com/default-image.png';

function Home(props) {

  const iconClass = iconTheme();

  const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
  const [userBank, setUserBank] = useState([])
  const [viewingUser, setViewingUser] = useState([]);
  const [index, setIndex] = useState()

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/matches/swipe/${currentUserId}`)
      const data = await res.json();
      console.log(data)
      setUserBank(data)
      setViewingUser([data[0]])
      setIndex(0)
    })()
  }, []);

  const getMoreSwipes = async () => {
      const res = await fetch(`/api/matches/swipe/${currentUserId}`)
      const data = await res.json();
      setUserBank(data)
      setViewingUser([data[0]])
      setIndex(0)
  }

  const handleSwipe = () =>{
    const swipe_id = viewingUser[0].user.id;
    if(index >= userBank.length - 1){
      getMoreSwipes()
    } else {
      setIndex(index + 1)
      setViewingUser([userBank[index + 1]])
    }
    return swipe_id
  }

  const updateDatabase = (url, user_id) => {
    const body = JSON.stringify({user_id});
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    fetchWithCSRF(url, options);
  }

  const reject = () => {
    const reject_id = handleSwipe()
    const url = `/api/matches/reject/${currentUserId}`;
    updateDatabase(url, reject_id)
  }

  const accept = () => {
    const accept_id = handleSwipe()
    const url = `/api/matches/add-match/${currentUserId}`;
    updateDatabase(url, accept_id)
  }

  let user = '<div>no more matches</div>'
  console.log(viewingUser)
  if (viewingUser[0]) {
    user = viewingUser.map(({user}) => {
      console.log(user)
      console.log(user.photos)
      let photos = user.photos.map((photo) =>
        <img className='swipe-img' src={photo.photo_url} alt='profile picture' key={photo.photo_url}/>
      )
      const preferences = user.preferences.map(([preference_id, preference]) =>
      <div key={preference}>
        <p key={preference}>{preference}</p>
      </div>
      )
      if(photos.length <= 0){
        photos = [<img className='swipe-img' src={defaultImage} alt='person'/>]
      }
      return (
        <div className='swipe-con' key={user.id}>
          <ClearIcon className={iconClass.nope} onClick={reject}/>
          <div className='swipe-img-con'>
          {photos}
          </div>
          <div className='swipe__info'>
            <h3 className='swipe-info__head'>{user.first_name} {user.last_name}</h3>
            <h4 className='swipe-info__sub-head'>{user.location}</h4>
            <p className='swipe-bio'>{user.gender[1]}</p>
            <div className='preferences'>
              {preferences}
            </div>
            <p className='swipe-bio'>{user.bio}</p>
          </div>
          <FavoriteIcon  className={iconClass.heart} onClick={accept}/>
        </div>
      )
    })
  }

  return (
    user
  );
}
export default Home;
