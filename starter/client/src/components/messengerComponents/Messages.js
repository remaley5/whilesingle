import React, { useEffect, useState, useRef, useContext }  from 'react'
import '../../styles/messenger.css'
import SendIcon from '@material-ui/icons/Send';
import UserBox from './UserBox';
import MessageBox from './MessageBox'
import AuthContext from '../../auth'
import socketIOClient from "socket.io-client"

// const ENDPOINT = "http://localhost:3000"
const endpoint = 'http://localhost:8000'//process.env.REACT_APP_ENDPOINT || 8000;


const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedName, setSelectedName] = useState();
    const [recipientId, setRecipientId] = useState();
    const [message, setMessage] = useState('');
    const scrollDiv = useRef()
    const [match, setMatch] = useState();
    const [messages, setMessages] = useState([])

    const { currentUserId } = useContext(AuthContext);

    const messageRef = useRef()


    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/matches/get-matches/${currentUserId}`);
            const responseData = await response.json();
            // console.log(responseData)
            setUsers(responseData);
        })()
        scrollDiv.current.scrollTop = 1000000000000000;
    }, [currentUserId]);

    const handleSend = async(e) => {
        e.preventDefault()
        setMessage('')
        messageRef.current.value = '';
        scrollDiv.current.scrollTop = 1000000000000000;
        const socket = socketIOClient(endpoint);
        socket.emit('FromClient', { message: message, from_id: currentUserId, match_id: match });
    }

    const handleMessage = (e) => setMessage(e.target.value)

    const userComponents = users.map((user, idx) =>
    <UserBox setRecipientId={setRecipientId}
    recipientId={recipientId}
    setSelectedName={setSelectedName}
    messages={messages}
    setMessages={setMessages}
    setMatch={setMatch}
    match={match}
    scrollDiv={scrollDiv}
    user={user} key={idx}/>)

    const messageComponents = messages.map((message, idx) => <MessageBox message={message} key={idx}/>)

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
                        ref={messageRef}
                        id="standard-basic" placeholder={!selectedName ?"Talk to them!" : `Talk to ${selectedName}!`}></textarea>
                        <SendIcon className='send' onClick={handleSend}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Messages
