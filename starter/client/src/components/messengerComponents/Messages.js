import React, { useEffect, useState, useRef }  from 'react'
import '../../styles/messenger.css'
import SendIcon from '@material-ui/icons/Send';
import UserBox from './UserBox';


const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedName, setSelectedName] = useState();
    const [recipientId, setRecipientId] = useState();
    const [message, setMessage] = useState();
    const scrollDiv = useRef()



    useEffect(() => {
        (async () => {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        })()
        scrollDiv.current.scrollTop = 1000000000000000;
    }, []);

    const handleSend = (e) => {
        e.preventDefault()
        // console.log(message)
    }
    const handleMessage = (e) => setMessage(e.target.value)
    const userComponents = users.map((user) =>
    <UserBox setRecipientId={setRecipientId}
    recipientId={recipientId}
    setSelectedName={setSelectedName}
    user={user} key={user.id}/>)

    return (
        <div className='messenger'>
            <div className='side-bar'>
                {userComponents}
            </div>
            <div className='compose-message' ref={scrollDiv}>
                <div className='user-message'>Hey girl how you doin? You want to see my pokemon cards?
                I'm not trying to brag or anything but I am kind of a big deal. As in I am a
                pokemon master. Plus I am a shinobi. I mean I can go zero to chidori in 5 seconds flat.</div>
                <div className='from-user-message'>Leave me alone, you jabroni.</div>
                <div className='user-message'>Ouch, strike out huh?</div>
                <div className='from-user-message'>Obvi</div>
                <div className='user-message'>Sorry I am kinda nerdy and wanted to impress you.</div>
                <div className='from-user-message'>It was a little weird fosho.</div>
                <div className='user-message'>Any chance I can start over here?</div>
                <div className='from-user-message'>UMMMM.....probably not my dude.</div>
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