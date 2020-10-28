import React, { useEffect, useRef }  from 'react'
import '../../styles/messenger.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const UserBox = ({user, setSelectedName, recipientId, setRecipientId }) => {

    const parent = useRef()

    useEffect(() => {
        if(user.id === Number(recipientId)){
            parent.current.classList.add('user-selected')
            parent.current.classList.remove('user')
        } else {
            parent.current.classList.remove('user-selected')
            parent.current.classList.add('user')
        }
    }, [user.id, recipientId]);

    const handleClick = (e) => {
        // setSelectedDiv(e.target)
        setSelectedName(user.first_name)
        setRecipientId(user.id)
    }

    return(
        <div className='user' value={user.id} key={user.id} onClick={handleClick} ref={parent}>
            {user.profile_image ? user.profile_image :<AccountCircleIcon className='default-profile-image'/>}
            <div className='username-text'>{user.first_name}</div>
        </div>
    )
}

export default UserBox


// <div className='user-overlay' >
// <div className='user' username={user.first_name} value={user.id} key={user.id}>
// {user.profile_image ? user.profile_image :<AccountCircleIcon className='default-profile-image'/>}
// <div className='username-text'>{user.first_name}</div></div>
// </div>)
