import React from 'react';
import pluralize from 'pluralize';

function SetConnections({ preferences, setMyConnections }) {

    const onChange = e => {
        setMyConnections(e.target.value)
    }

    return (
        <div className='section'>
            <h2 className='pref-form-head'>I'm looking for...</h2>
            <form className='chkbx-form'>
                {preferences.map((preference) => (
                    <div className='chck-sel'>
                        <label for={preference} className='chck-sel-lbl'>{preference[1]}</label>
                        <div className='chk-sel-bx'><input type='checkbox' id={preference} value={preference[0]} /></div>
                    </div>
                ))

                }
            </form>
        </div>
    );
}
export default SetConnections;
