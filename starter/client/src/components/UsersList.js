import React, { useEffect, useState, useContext } from 'react';
import User from './User';
import AuthContext from '../auth'


function UsersList (props) {
    const [users, setUsers] = useState([]);

    const { currentUserId } = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/matches/get-matches/${currentUserId}`);
            const responseData = await response.json();
            console.log(responseData)
            setUsers(responseData);
        }
        fetchData();
    }, [currentUserId]);

    const userComponents = users.map((user) => <User key={user.id} user={user} />)
    return (
        <>
            <h1 className='matches-header'>Matches: </h1>
            {userComponents}
        </>
    );
}

export default UsersList;
