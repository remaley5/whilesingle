import React, { useEffect, useState, useRef, useContext }  from 'react'
import '../../styles/messenger.css'
import SendIcon from '@material-ui/icons/Send';
import UserBox from './UserBox';
import MessageBox from './MessageBox'
import AuthContext from '../../auth'


const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedName, setSelectedName] = useState();
    const [recipientId, setRecipientId] = useState();
    const [message, setMessage] = useState();
    const scrollDiv = useRef()
    const [match, setMatch] = useState();
    const [messages, setMessages] = useState([])

    const { currentUserId } = useContext(AuthContext);


    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/matches/get-matches/${currentUserId}`);
            const responseData = await response.json();
            console.log(responseData)
            setUsers(responseData);
        })()
        scrollDiv.current.scrollTop = 1000000000000000;
    }, [currentUserId]);

    const handleSend = (e) => {
        e.preventDefault()
        console.log(message)
    }
    const handleMessage = (e) => setMessage(e.target.value)

    const userComponents = users.map((user) =>
    <UserBox setRecipientId={setRecipientId}
    recipientId={recipientId}
    setSelectedName={setSelectedName}
    messages={messages}
    setMessages={setMessages}
    setMatch={setMatch}
    match={match}
    user={user} key={user.id}/>)

    const messageComponents = messages.map((message) => <MessageBox message={message}/>)

    return (
        <div className='messenger'>
            <div className='side-bar'>
                {userComponents}
            </div>
            <div className='compose-message' ref={scrollDiv}>
                {messageComponents}
                <div className='form-box'>
                    <form className='message-box' onSubmit={handleSend}>
                        <textarea className='message-sender'
                        onChange={handleMessage} size='medium'
                        aria-label="maximum 4 rows"
                        id="standard-basic" placeholder={!selectedName ?"Talk to them!" : `Talk to ${selectedName}!`}></textarea>
                        <SendIcon className='send' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Messages
