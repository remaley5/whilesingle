import React, { useState, createContext, useEffect } from "react";

export const UserFrContext = createContext();

export const UserFrContextProvider = (props) => {
  // need to get user Id from context or something.
  // hard code for now
	const user_id = 1;

  // we'll also need a match id to load their answered questions only
  const match_id = 2;

  const useFetch = (url) => {
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
    }, [match_id]);
    return [data, loading];
  };

  const [userAnsweredFr, userAnsweredFrLoading] = useFetch(
    `/api/questions/fr/answered/${user_id}`
  );
  const [userUnansweredFr, userUnansweredFrLoading] = useFetch(
    `/api/questions/fr/unanswered/${user_id}`
  );

  const frContext = {
    userAnsweredFr,
    userUnansweredFr,
  };

  const frLoading = [
    userAnsweredFrLoading,
    userUnansweredFrLoading,
	];

	// make sure context loaded before rendering children
  for (let i = 0; i < frLoading.length; i++) {
    if (frLoading[i]) {
      return 'Loading...';
    }
	}

  return (
    <UserFrContext.Provider value={frContext}>{props.children}</UserFrContext.Provider>
  );
};