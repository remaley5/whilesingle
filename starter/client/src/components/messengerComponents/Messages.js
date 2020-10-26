import React, { useEffect, useState }  from 'react'
import '../../styles/messenger.css'
import TextField from '@material-ui/core/TextField'


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
    const userComponents = users.map((user) => <div className='user' value={user.id} key={user.id} onClick={handleClick}>{user.username}</div>)
    return (
        <div className='messenger'>
            <div className='side-bar'>
                {userComponents}
            </div>
            <div className='compose-message'>
                <div>Hey BOI</div>
                <form className='message-box' onSubmit={handleSend}>
                    <TextField className='message-sender'
                    rowsMax={3} onChange={handleMessage} size='medium'
                    id="standard-basic" label={!selectedName ?"Talk to them!" : `Talk to ${selectedName}`} />
                </form>
            </div>
        </div>
    )
}

export default Messages