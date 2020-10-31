import React from 'react';
import pluralize from 'pluralize';

function SetBio() {
    return (
        <div className='section'>
            <h2 className='pref-form-head'>About me:</h2>
            <form className='txt-form'>
                <textarea name='bio' className='txt-inpt'/>
            </form>
        </div>
    );
}
export default SetBio;
