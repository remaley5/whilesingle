import React from 'react';
import pluralize from 'pluralize';

function SetOrientation({genders, setMyOrientation, myOrientation}) {

    const onChange = e => {
        if(myOrientation.includes(e.target.value)) {
            var array = [...myOrientation]; // make a separate copy of the array
            var index = array.indexOf(e.target.value)
            if (index !== -1) {
              array.splice(index, 1);
              setMyOrientation(array)
            }
        } else {
            let newConnect = [...myOrientation, e.target.value]
            setMyOrientation(newConnect)
        }
    }


    return (
        <div className='section'>
            <h2 className='pref-form-head'>I'm interested in...</h2>
            <form className='chkbx-form'>
                { genders.map((gender) => (
                    <div className='chck-sel'>
                        <label for={gender} className='chck-sel-lbl'>{gender[1]}</label>
                        <div className='chk-sel-bx'><input type='checkbox' onClick={onChange} id={gender} value={gender[0]} /></div>
                    </div>
                ))

                }
            </form>
        </div>
    );
}
export default SetOrientation;
