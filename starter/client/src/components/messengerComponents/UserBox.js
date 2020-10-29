import React, { useEffect, useRef, useState }  from 'react'
import '../../styles/messenger.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:3000"


const UserBox = ({user, setSelectedName, recipientId, setRecipientId, setMatch, setMessages, messages }) => {

    const parent = useRef()

    // const [newMessage, setNewMessage] = useState();

    useEffect(() => {
        if(user.user_id === Number(recipientId)){
            parent.current.classList.add('user-selected')
            parent.current.classList.remove('user')
        } else {
            parent.current.classList.remove('user-selected')
            parent.current.classList.add('user')
        }

    }, [user.user_id, recipientId]);


    const handleClick = (e) => {
        setSelectedName(user.first_name)
        setRecipientId(user.user_id)
        setMatch(user.match_id)
        getMessages()

        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", addNewMessage)
    }

    const getMessages = async () => {
        const response = await fetch(`/api/messages/get-messages/${user.match_id}`)
        const responseData = await response.json();
        console.log(responseData)
        setMessages(responseData)
    }

    const addNewMessage = (data) => {
        setMessages(previousState => [...previousState, data])
    }

    return(
        <div className='user' value={user.id} key={user.id} onClick={handleClick} ref={parent}>
            {user.profile_image ? user.profile_image :<AccountCircleIcon className='default-profile-image'/>}
            <div className='username-text'>{user.first_name}</div>
        </div>
    )
}

export default UserBox
