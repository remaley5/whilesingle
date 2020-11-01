import React from 'react';

function SetPronouns({pronouns, myPronouns, setMyPronouns}) {

    const onChange = e => {
        setMyPronouns(parseInt(e.target.value, 10))
    }

    return (
        <div className='section'>
            <h2 className='pref-form-head'>My pronouns are...</h2>
            <div className='chkbx-form'>
                {pronouns.map((pronoun, idx) => (
                    <div key={idx} className='chck-sel'>
                        <input type="radio" onChange={onChange} name="pronoun" value={pronoun[0]} checked={pronoun[0] === myPronouns}/>
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
