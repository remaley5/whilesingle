import React, { useContext, useState, useEffect} from 'react';
import AuthContext from '../auth'

let user = {
  username: 'Sophie',
  location: 'Portland, OR',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat nulla eget nunc tempor laoreet. Quisque ac gravida enim, at viverra lorem. Nulla quis magna leo. Donec quis ante vel magna sodales luctus ac sed ipsum. Nulla consequat varius finibus. Sed non fermentum ex. Fusce dignis',
  preferences: 'Gay, Androgynous, Single, Monogamy or Non-Monogamy'
}

function Home(props) {

  const { currentUserId } = useContext(AuthContext);
  const [userBank, setUserBank] = useState()
  const [viewingUser, setViewingUser] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/matches/swipe/${currentUserId}`)
      const data = await res.json();
      setUserBank(data)
      setViewingUser(data[0])
    })()
  }, []);

  return (
    <>
      <div className='swipe-con'>
        <div className='swipe-img-con'>
          <img className='swipe-img' src='https://while-single-bucket.s3-us-west-2.amazonaws.com/default.jpg' alt='person'/>
        </div>
        <div className='swipe__info'>
          <h3 className='swipe-info__head'>{user.username}</h3>
          <h4 className='swipe-info__sub-head'>{user.location}</h4>
          <p className='swipe-bio'>{user.bio}</p>
        </div>
      </div>
    </>
  );
}
export default Home;
