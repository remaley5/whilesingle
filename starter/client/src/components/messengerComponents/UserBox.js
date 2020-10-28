import React, { useEffect, useState, useRef }  from 'react'
import '../../styles/messenger.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const UserBox = ({user, setSelectedName, recipientId, setRecipientId, setMatch, setMessages }) => {

    const parent = useRef()

    useEffect(() => {

        if(user.user_id === Number(recipientId)){
            parent.current.classList.add('user-selected')
            parent.current.classList.remove('user')
        } else {
            parent.current.classList.remove('user-selected')
            parent.current.classList.add('user')
        }
    }, [recipientId]);

    const handleClick = (e) => {
        // setSelectedDiv(e.target)
        setSelectedName(user.first_name)
        setRecipientId(user.user_id)
        setMatch(user.match_id)
        // console.log(match)
        getMessages()
    }

    const getMessages = async () => {
        const response = await fetch(`/api/messages/get-messages/${user.match_id}`)
        const responseData = await response.json();
        console.log(responseData)
        setMessages(responseData)
    }

    return(
        <div className='user' value={user.id} key={user.id} onClick={handleClick} ref={parent}>
            {user.profile_image ? user.profile_image :<AccountCircleIcon className='default-profile-image'/>}
            <div className='username-text'>{user.first_name}</div>
        </div>
    )
}

export default UserBox
