import React from 'react';

const genders = [
    'two spirit',
    'non binary',
    'cis woman',
    'cis man',
    'trans woman',
    'trans man',
    'gender fluid'
]

function SetGender(props) {
    return (
        <div className='section'>
            <h2 className='pref-form-head'>I am...</h2>
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
export default SetGender;
