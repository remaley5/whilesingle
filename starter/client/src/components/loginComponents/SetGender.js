import React from 'react';

function SetGender({ genders, myGender, setMyGender }) {

    const onChange = e => {
        setMyGender(e.target.value)
    }

    return (
        <div className='section'>
            <h2 className='pref-form-head'>I am...</h2>
            <div className='chkbx-form'>
                {genders.map((gender) => (
                    <div className='chck-sel'>
                        <input type="radio" onChange={onChange} name="radio" value={gender[0]} />
                        <label class="container chk-sel-lbl">{gender[1]}
                        </label>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default SetGender;
