import React, { useContext, useEffect, useState } from 'react';
import SetGender from './SetGender'
import SetPronouns from './SetPronouns'
import SetOrientation from './SetOrientation'
import SetBio from './SetBio'
import SetPhotos from './SetPhotos'
import SetConnections from './SetConnections'
import SetBirthday from './SetBirthday'
import SetLocation from './SetLocation'
import AuthContext from '../../auth'

function SetPreferences({ edit }) {
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    const [genders, setGenders] = useState([])
    const [preferences, SetPreferences] = useState([])
    const [pronouns, setPronouns] = useState([])
    const [myGender, setMyGender] = useState('')
    const [myPronouns, setMyPronouns] = useState([])
    const [myConnections, setMyConnections] = useState([])
    const [myOrientation, setMyOrientation] = useState([])
    const [myBio, setMyBio] = useState('')
    const [myBirthday, setMyBirthday] = useState([])
    const [myLocation, setMyLocation] = useState('')

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

    const handleSubmit = async() => {
        const preferences = {
            'gender': myGender,
            'pronouns': myPronouns,
            'preferences': myConnections,
            'orientation': myOrientation,
            'bio': myBio,
            'birthday': myBirthday,
            'location': myLocation
        }
        const response = await fetchWithCSRF(`/api/users/${currentUserId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preferences)
        })
        console.log(response.json)
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
            <SetLocation myLocation={myLocation} setMyLocation={setMyLocation} />
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
