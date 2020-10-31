import React, { useContext, useEffect, useState } from 'react';
import SetGender from './SetGender'
import SetPronouns from './SetPronouns'
import SetOrientation from './SetOrientation'
import SetBio from './SetBio'
import SetPhotos from './SetPhotos'
import SetConnections from './SetConnections'
import SetBirthday from './SetBirthday'
import AuthContext from '../../auth'

function SetPreferences({ edit, handleClose, user}) {
		let currentGenders=[];
		// let currentPreferences=[];
		let currentPronouns=[];
		let currentConnections=[];
		let currentOrientation = [];
		let currentBio='';
		let currentBirthday = []
		if (user) {
			currentGenders = user.gender;
			// currentPreferences = user.preferences;
			currentPronouns = user.pronouns;
			currentConnections = user.connections
			currentOrientation = user.myOrientation
			currentBio = user.bio
			currentBirthday = user.birthday
		}


    const { currentUserId } = useContext(AuthContext);
    const [genders, setGenders] = useState([])
    const [preferences, SetPreferences] = useState([])
    const [pronouns, setPronouns] = useState([])
    const [myGender, setMyGender] = useState(currentGenders || [])
    const [myPronouns, setMyPronouns] = useState(currentPronouns || [])
    const [myConnections, setMyConnections] = useState(currentConnections || [])
    const [myOrientation, setMyOrientation] = useState(currentOrientation || [])
    const [myBio, setMyBio] = useState(currentBio || '')
    const [myBirthday, setMyBirthday] = useState(currentBirthday || [])

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
				handleClose()
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
