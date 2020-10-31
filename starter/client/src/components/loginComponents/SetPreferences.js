import React, {useContext, useEffect, useState} from 'react';
import SetGender from './SetGender'
import SetPronouns from './SetPronouns'
import SetOrientation from './SetOrientation'
import SetBio from './SetBio'
import SetPhotos from './SetPhotos'
import SetConnections from './SetConnections'
import SetFreeResponse from './SetFreeResponse'
import SetBirthday from './SetBirthday'
import AuthContext from '../../auth'

function SetPreferences(props) {
    const { currentUserId} = useContext(AuthContext);
    const [genders, setGenders] = useState([])
    const [preferences, SetPreferences] = useState([])
    const [pronouns, setPronouns] = useState([])

    useEffect(() => {
        async function get_options() {
            const response = await fetch('/api/users/info_options');
            const res = await response.json();
            console.log('response data', res);
            setGenders(res.genders)
            SetPreferences(res.preferences)
            setPronouns(res.pronouns)
        }
        get_options()
    }, [])

    return (
        <div className='preferences'>
            <SetGender genders={genders}/> {/* Pronouns, gender identity, gender preferences,  */}
            <SetPronouns pronouns={pronouns}/>
            <SetConnections preferences={preferences}/>
            <SetOrientation genders={genders}/>
            <SetBio />
            <SetBirthday />
            <SetPhotos />
            {/* <SetFreeResponse /> */}
        </div>
    );
}

export default SetPreferences;
