import React from 'react';
import pluralize from 'pluralize';

function SetLocation({myLocation, setMyLocation}) {

    const onChange = e => {
        setMyLocation(e.target.value)
    }
    return (
        <div className='section' onChange={onChange}>
            <h2 className='pref-form-head'>I am in: </h2>
            <div className='input'>
                <input type='text' name='location' value={myLocation} onChange={onChange} className='pref-txt'/>
                </div>
        </div>
    );
}
export default SetLocation;
