import React, { useEffect, useState }  from 'react'
import '../../styles/messenger.css'
import TextField from '@material-ui/core/TextField'


const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedName, setSelectedName] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    const handleClick = (e) => {
        const username = e.target.innerHTML
        setSelectedName(username)
        console.log(e.target.value)
        // console.log(selectedName)
    }

    const userComponents = users.map((user) => <div className='user' value='hey' key={user.id} onClick={handleClick}>{user.username}</div>)
    return (
        <div className='messenger'>
            <div className='side-bar'>
                {userComponents}
            </div>
            <div className='compose-message'>
                <div>Hey BOI</div>
                <form className='message-box'>
                    <TextField className='message-sender'
                    id="filled-basic" label={!selectedName ?"Talk to them!" : `Talk to ${selectedName}`}
                    variant="filled" />
                </form>
            </div>
        </div>
    )
}

export default Messages