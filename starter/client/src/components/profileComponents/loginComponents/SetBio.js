import React from 'react';
import pluralize from 'pluralize';

function SetBio({myBio, setMyBio}) {

    const onChange = e => {
        setMyBio(e.target.value)
    }
    return (
        <div className='section' onChange={onChange}>
            <h2 className='pref-form-head'>About me:</h2>
            <form className='txt-form'>
                <textarea name='bio' value={myBio} onChange={onChange} className='txt-inpt'/>
            </form>
        </div>
    );
}
export default SetBio;
