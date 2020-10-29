import React, { useState, createContext, useEffect, useContext } from "react";
import AuthContext from '../auth';

export const FrContext = createContext();

export const FrContextProvider = (props) => {
	const {currentUserId: user_id} = useContext(AuthContext);

  // we'll also need a match id to load their answered questions only
  const match_id = 1;

  const useFetch = (url, id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(url);
        const json = await res.json();
        // call returns object with one key - we only want its value (an array)
        const data = json[Object.keys(json)];
        setData(data);
        setLoading(false);
      }
      fetchData();
    }, [id, url]);
    return [data, loading];
  };

  const [allFr, allFrLoading] = useFetch("/api/questions/fr/all");
  const [userAnsweredFr, userAnsweredFrLoading] = useFetch(
    `/api/questions/fr/answered/${user_id}`, user_id
  );
  const [userUnansweredFr, userUnansweredFrLoading] = useFetch(
    `/api/questions/fr/unanswered/${user_id}`, user_id
  );
  // const allFr = useFetch("/api/questions/fr/all")
  // setAllFr(data);
  const [matchAnsweredFr, matchAnsweredFrLoading] = useFetch(
    `/api/questions/fr/answered/${match_id}`, match_id
  );


  const fr = {
    allFr,
    userAnsweredFr,
    userUnansweredFr,
    matchAnsweredFr,
  };


  const frLoading = [
    allFrLoading,
    userAnsweredFrLoading,
    userUnansweredFrLoading,
    matchAnsweredFrLoading,
	];

	// make sure context loaded before rendering children
  for (let i = 0; i < frLoading.length; i++) {
    if (frLoading[i]) {
      return 'Loading...';
    }
	}

  return (
    <FrContext.Provider value={fr}>{props.children}</FrContext.Provider>
  );
};
