import React, { useRef } from 'react';


function User({user}) {
    console.log(user)
    const wrapper = useRef()
    const handleRemoveMatch = (e) => {
        wrapper.current.classList.add('match-wrapper-hidden')
    }

    return (
        <div className='match-wrapper' ref={wrapper}>
            <p className='match-name'>{user.first_name}, {user.last_name}</p>
            <div className='remove-button' onClick={handleRemoveMatch}>Remove</div>
        </div>
    );
}
export default User;