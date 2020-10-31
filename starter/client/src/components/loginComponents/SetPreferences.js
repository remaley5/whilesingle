import React, {useContext, useEffect, useState} from 'react';
import SetGender from './SetGender'
import SetPronouns from './SetPronouns'
import SetBio from './SetBio'
import SetPhotos from './SetPhotos'
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
        <div className='test-page'>
            <SetGender genders={genders}/> {/* Pronouns, gender identity, gender preferences,  */}
            <SetPronouns pronouns={pronouns}/>
            <SetBio />
            <SetBirthday />
            <SetPhotos />
            <SetFreeResponse />
            {/* <SetConnections preferences={preferences}/> */}
            {/* <SetOrientation genders={genders}/> */}
        </div>
    );
}

export default SetPreferences;
