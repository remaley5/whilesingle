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
                <div>
                    where messages go.
                </div>

                <div className='form-box'>
                    <form className='message-box' onSubmit={handleSend}>
                        <TextareaAutosize className='message-sender'
                        rowsMax={4} onChange={handleMessage} size='medium'
                        id="standard-basic" placeholder={!selectedName ?"Talk to them!" : `Talk to ${selectedName}`} />
                        <SendIcon className='send' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Messages