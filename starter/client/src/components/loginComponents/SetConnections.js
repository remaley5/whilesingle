import React from 'react';
// import pluralize from 'pluralize';

function SetConnections({ preferences, myConnections, setMyConnections }) {

    const onChange = e => {
        if(myConnections.includes(e.target.value)) {
            var array = [...myConnections]; // make a separate copy of the array
            var index = array.indexOf(e.target.value)
            if (index !== -1) {
              array.splice(index, 1);
              setMyConnections(array)
            }
        } else {
            let newConnect = [...myConnections, e.target.value]
            setMyConnections(newConnect)
        }
    }

    return (
        <div className='section'>
            <h2 className='pref-form-head'>I'm looking for...</h2>
            <form className='chkbx-form'>
                {preferences.map((preference) => (
                    <div className='chck-sel'>
                        <label for={preference} className='chck-sel-lbl'>{preference[1]}</label>
                        <div className='chk-sel-bx'><input type='checkbox' onChange={onChange} id={preference} value={preference[0]} /></div>
                    </div>
                ))

                }
            </form>
        </div>
    );
}
export default SetConnections;
