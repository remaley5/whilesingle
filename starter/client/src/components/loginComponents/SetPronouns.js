import React from 'react';

function SetPronouns({pronouns, myPronouns, setMyPronouns}) {

    const onChange = e => {
        if(myPronouns.includes(e.target.value)) {
            var array = [...myPronouns]; // make a separate copy of the array
            var index = array.indexOf(e.target.value)
            if (index !== -1) {
              array.splice(index, 1);
              setMyPronouns(array)
            }
        } else {
            let newConnect = [...myPronouns, e.target.value]
            setMyPronouns(newConnect)
        }
    }

    return (
        <div className='section'>
            <h2 className='pref-form-head'>My pronouns are...</h2>
            <form className='chkbx-form'>
                { pronouns.map((pronoun) => (
                    <div className='chck-sel'>
                        <label for={pronoun} className='chck-sel-lbl'>{pronoun[1]}</label>
                        <div className='chk-sel-bx'><input type='checkbox' onChange={onChange} id={pronoun} value={pronoun[0]} /></div>
                    </div>
                ))

                }
            </form>
        </div>
    );
}
export default SetPronouns;
