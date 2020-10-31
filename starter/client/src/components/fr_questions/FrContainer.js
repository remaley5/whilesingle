import React, { useContext, useState, useEffect } from "react";

import FrEdit from "./FrEdit";
import FrView from "./FrView";
import AuthContext from "../../auth";

export default function FrContainer({ edit, updatedFr, setUpdatedFr, frUpdated }) {
  const { currentUserId } = useContext(AuthContext);

//---------------------------------
  const [loading, setLoading] = useState(true);

  const useFetch = (url, loadFn) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      // console.log('hits use effect')
      async function fetchData() {
        const res = await fetch(url);
        const json = await res.json();
        // call returns object with one key - we only want its value (an array)
        const data = json[Object.keys(json)];
				setData(data);
				if(loadFn) {
					loadFn(false)
				}
        // setLoading(false);
      }
      fetchData();
    }, [currentUserId, frUpdated]);
    return data;
  };

  const userAnsweredFr = useFetch(`/api/questions/fr/answered/${currentUserId}`);
  const userUnansweredFr = useFetch(`/api/questions/fr/unanswered/${currentUserId}`, setLoading);

	// useEffect(()=>{
	// 	console.log('hist')
	// }, [frUpdated])

  if (loading) {
    return "waiting...";
  }


  // if user editing their own answers
  if (edit) {
    const frArr = [...userAnsweredFr, ...userUnansweredFr];
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrEdit
            key={idx}
            frObj={frObj}
            setUpdatedFr={setUpdatedFr}
            updatedFr={updatedFr}
          />
        ))}
      </>
    );
    // if user viewing their profile
  } else {
    const frArr = [...userAnsweredFr];
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrView key={idx} frObj={frObj} />
        ))}
      </>
    );
  }
}
