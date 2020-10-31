import React from 'react';

function SetPronouns({pronouns, myPronouns, setMyPronouns}) {

    const onChange = e => {
        setMyPronouns(e.target.value)
    }

    return (
        <div className='section'>
            <h2 className='pref-form-head'>My pronouns are...</h2>
            <div className='chkbx-form'>
                {pronouns.map((pronoun) => (
                    <div className='chck-sel'>
                        <input type="radio" onChange={onChange} name="radio" value={pronoun[0]} />
                        <label class="container chk-sel-lbl">{pronoun[1]}
                        </label>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default SetPronouns;
