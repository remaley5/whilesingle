<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
=======
import React, { useContext, useEffect, useState } from 'react';
>>>>>>> b5741416e37eea49bda0c35f2c66e65e5cc35ce6
import SetGender from './SetGender'
import SetPronouns from './SetPronouns'
import SetOrientation from './SetOrientation'
import SetBio from './SetBio'
import SetPhotos from './SetPhotos'
import SetConnections from './SetConnections'
import SetBirthday from './SetBirthday'
// import AuthContext from '../../auth'

<<<<<<< HEAD
function SetPreferences(props) {
    // const { currentUserId} = useContext(AuthContext);
=======
function SetPreferences({ edit }) {
    const { currentUserId } = useContext(AuthContext);
>>>>>>> b5741416e37eea49bda0c35f2c66e65e5cc35ce6
    const [genders, setGenders] = useState([])
    const [preferences, SetPreferences] = useState([])
    const [pronouns, setPronouns] = useState([])
    const [myGender, setMyGender] = useState([])
    const [myPronouns, setMyPronouns] = useState([])
    const [myConnections, setMyConnections] = useState([])
    const [myOrientation, setMyOrientation] = useState([])
    const [myBio, setMyBio] = useState('')
    const [myBirthday, setMyBirthday] = useState([])

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

    const handleSubmit = e => {
        console.log(myGender, myPronouns, myConnections, myOrientation, myBio, myBirthday)
    }

    return (
        <div className='preferences'>
            {!edit ?
                <h2 className='pref-head'>Tell us about yourself</h2>
                : null}
            <SetGender genders={genders} myGender={myGender} setMyGender={setMyGender} /> {/* Pronouns, gender identity, gender preferences,  */}
            <SetPronouns pronouns={pronouns} myPronouns={myPronouns} setMyPronouns={setMyPronouns} />
            <SetConnections preferences={preferences} myConnections={myConnections} setMyConnections={setMyConnections} />
            <SetOrientation genders={genders} myOrientation={myOrientation} setMyOrientation={setMyOrientation} />
            { !edit ?
                <>
                    <SetBio myBio={myBio} setMyBio={setMyBio} />
                    <SetBirthday myBirthday={myBirthday} setMyBirthday={setMyBirthday} />
                    <SetPhotos />
                    <button type='submit' class='set-btn' onClick={handleSubmit}>I'm ready</button>
                </> :
                <button type='submit' class='set-btn' onClick={handleSubmit}>save</button>

            }
        </div>
    );
}

export default SetPreferences;
