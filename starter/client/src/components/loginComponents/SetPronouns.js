import React from 'react';

function SetPronouns({pronouns}) {
    return (
        <div className='section'>
            <h2 className='pref-form-head'>My pronouns are...</h2>
            <form className='chkbx-form'>
                { pronouns.map((pronoun) => (
                    <div className='chck-sel'>
                        <label for={pronoun} className='chck-sel-lbl'>{pronoun}</label>
                        <div className='chk-sel-bx'><input type='checkbox' id={pronoun} value={pronoun} /></div>
                    </div>
                ))

                }
            </form>
        </div>
    );
}
export default SetPronouns;