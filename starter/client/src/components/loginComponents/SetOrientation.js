import React from 'react';
import pluralize from 'pluralize';

function SetOrientation({genders}) {
    return (
        <div className='section'>
            <h2 className='pref-form-head'>I'm interested in...</h2>
            <form className='chkbx-form'>
                { genders.map((gender) => (
                    <div className='chck-sel'>
                        <label for={gender} className='chck-sel-lbl'>{gender}</label>
                        <div className='chk-sel-bx'><input type='checkbox' id={gender} value={gender} /></div>
                    </div>
                ))

                }
            </form>
        </div>
    );
}
export default SetOrientation;
