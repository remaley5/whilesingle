import React, { useEffect, useState }  from 'react'
import '../../styles/messenger.css'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';


const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedName, setSelectedName] = useState();
    const [recipientId, setRecipientId] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
            console.log(users)
        }
        fetchData();
    }, []);

    const handleClick = (e) => {
        setSelectedName(e.target.innerHTML)
        setRecipientId(e.target.getAttribute('value'))
        // console.log(selectedName)
    }

    const handleSend = (e) => {
        e.preventDefault()
        console.log(message)
    }
    const handleMessage = (e) => setMessage(e.target.value)
    const userComponents = users.map((user) => <div className='user' value={user.id} key={user.id} onClick={handleClick}>{user.first_name}</div>)
    return (
        <div className='messenger'>
            <div className='side-bar'>
                {userComponents}
            </div>
            <div className='compose-message'>
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
                        rowsMax={4} onChange={handleMessage} size='medium'
                        aria-label="maximum 4 rows"
                        id="standard-basic" placeholder={!selectedName ?"Talk to them!" : `Talk to ${selectedName}`}></textarea>
                        <SendIcon className='send' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Messages