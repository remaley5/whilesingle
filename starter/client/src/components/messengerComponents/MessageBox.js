import React, { useContext }  from 'react'
import '../../styles/messenger.css'
import AuthContext from '../../auth'


const MessageBox = ({message}) => {

    const { currentUserId } = useContext(AuthContext);

    let class_name;

    if(message.from_id === currentUserId){
        class_name = 'user-message'
    } else {
        class_name = 'from-user-message'
    }

    return(
        <div className={class_name}>{message.message}</div>
    )
}

export default MessageBox
