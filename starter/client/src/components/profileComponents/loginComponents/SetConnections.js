import React from 'react';
// import pluralize from 'pluralize';

function SetConnections({ preferences, myConnections, setMyConnections }) {

    const onChange = e => {
        const value = parseInt(e.target.value,10)
        if(myConnections.includes(value)) {
            let array = [...myConnections]; // make a separate copy of the array
            let index = array.indexOf(value)
            if (index !== -1) {
              array.splice(index, 1);
              setMyConnections(array)
            }
        } else {
            let newConnect = [...myConnections, value]
            setMyConnections(newConnect)
        }
    }

    // console.log('preferences', preferences)
    // console.log('myCOnnections', myConnections)
    return (
        <div className='section'>
            <h2 className='pref-form-head'>I'm looking for...</h2>
            <form className='chkbx-form'>
                {preferences.map((preference, idx) => (
                    <div key={idx} className='chck-sel'>
                        <label for={preference} className='chck-sel-lbl'>{preference[1]}</label>
                        <div className='chk-sel-bx'><input type='checkbox' onChange={onChange} id={preference} value={preference[0]} checked={myConnections.indexOf(preference[0])!==-1 }/></div>
                    </div>
                ))
                }
            </form>
        </div>
    );
}
export default SetConnections;
