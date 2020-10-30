import React, { useContext, useState, useEffect} from 'react';
import AuthContext from '../auth'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import { iconTheme } from '../styles/homeThemes';

const defaultImage = 'https://while-single-two.s3-us-west-2.amazonaws.com/ThuOct291512442020.png';

function Home(props) {

  const iconClass = iconTheme();

  const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
  const [userBank, setUserBank] = useState([]);
  const [viewingUser, setViewingUser] = useState([]);
  const [index, setIndex] = useState();
  const [matchPercent, setMatchPercent] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/matches/swipe/${currentUserId}`)
      const data = await res.json();

      const resForPercent = await fetch(`/api/questions/mc/user/${currentUserId}/match/${data[0].user.id}`)
      const dataForPercent = await resForPercent.json()
      console.log(dataForPercent)
      setUserBank(data)
      setViewingUser([data[0]])
      setIndex(0)
      setMatchPercent(dataForPercent.match_percent)
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
      const preferences = user.preferences.map((preference) =>
      <div key={preference}>
        <p key={preference} className='preferences'>{preference}</p>
      </div>
      )
      if(photos.length <= 0){
        photos = [<img className='swipe-img1' src={defaultImage} alt='person'/>]
      }
      return (
        <div className='swipe-con' key={user.id}>
          <div className='swipe-img-con'>
          {photos}
          </div>
          <div className='swipe__info'>
            <h3 className='swipe-info__head'>{user.first_name} {user.last_name}</h3>
            <h4 className='swipe-info__sub-head'>{user.location}</h4>
            <p className='gender'>{`Gender: ${user.gender}`}</p>
            <div className='percent-match'>{`Match: ${matchPercent}%`}</div>
            <div className='preferences'>
              {preferences}
            </div>
            <p className='swipe-bio'>{user.bio}</p>
          </div>
          <ClearIcon className={iconClass.nope} onClick={reject}/>
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
