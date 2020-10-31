import React, { useState, createContext, useEffect, useContext } from "react";
import AuthContext from '../auth';

export const FrContext = createContext();

export const FrContextProvider = (props) => {
	const {currentUserId: user_id} = useContext(AuthContext);
	const [updated, setUpdated] = useState(true)

	const [loading, setLoading] = useState(true);

  const useFetch = (url, id) => {
    const [data, setData] = useState([]);
    useEffect(() => {
			// console.log('hits use effect')
      async function fetchData() {
        const res = await fetch(url);
        const json = await res.json();
        // call returns object with one key - we only want its value (an array)
        const data = json[Object.keys(json)];
        setData(data);
        setLoading(false);
      }
			fetchData();
			setUpdated(true)
    }, [id, url, updated])
    return [data, loading ];
  };

  const [userAnsweredFr, userAnsweredFrLoading] = useFetch(
    `/api/questions/fr/answered/${user_id}`, user_id
  );
  const [userUnansweredFr, userUnansweredFrLoading] = useFetch(
    `/api/questions/fr/unanswered/${user_id}`, user_id
  );
  const fr = {
    // allFr,
    userAnsweredFr,
    userUnansweredFr,
		setUpdated
  };


  // const frLoading = [
  //   // allFrLoading,
  //   userAnsweredFrLoading,
  //   userUnansweredFrLoading,
  //   matchAnsweredFrLoading,
	// ];

	// make sure context loaded before rendering children
  // for (let i = 0; i < frLoading.length; i++) {
  //   if (frLoading[i]) {
  //     return 'idk....';
  //   }
	// }

	if(loading) {
		return 'waiting...'
	}

  return (
    <FrContext.Provider value={fr}>{props.children}</FrContext.Provider>
  );
};
