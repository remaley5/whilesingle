import React from 'react';

function SetGender({ genders, myGender, setMyGender }) {

    const onChange = e => {
        // console.log('myGender from within onChange:', myGender)
        setMyGender(parseInt(e.target.value, 10))
    }

    // console.log('myGender right before return:', myGender)
    return (
        <div className='section'>
            <h2 className='pref-form-head'>I am...</h2>
            <div className='chkbx-form'>
                {genders.map((gender, idx) => (
                    <div className='chck-sel'key={idx}>
                        <input type="radio" onChange={onChange}  name="gender" value={gender[0]} checked={gender[0] === myGender}/>
                        <label className="container chk-sel-lbl">{gender[1]}
                        </label>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default SetGender;
