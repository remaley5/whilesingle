import React, {useContext} from 'react';
import SetGender from './SetGender'
import SetBio from './SetBio'
import SetPhotos from './SetPhotos'
import SetFreeResponse from './SetFreeResponse'
import SetBirthday from './SetBirthday'
import AuthContext from '../../auth'

function SetPreferences(props) {

    return (
        <div className='test-page'>
            <SetGender /> {/* Pronouns, gender identity, gender preferences,  */}
            <SetBio />
            <SetBirthday />
            <SetPhotos />
            <SetFreeResponse />
        </div>
    );
}

export default SetPreferences;
