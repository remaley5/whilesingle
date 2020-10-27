import React, { useState, createContext, useEffect } from "react";

export const MatchFrContext = createContext();

export const MatchFrContextProvider = (props) => {
	// match id will be from context somehow... later
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
    }, [url]);
    return [data, loading];
  };

  const [matchAnsweredFr, matchAnsweredFrLoading] = useFetch(
    `/api/questions/fr/answered/${match_id}`
  );

  const frContext = {
    matchAnsweredFr,
  };

  const frLoading = [
    matchAnsweredFrLoading
	];

	// make sure context loaded before rendering children
  for (let i = 0; i < frLoading.length; i++) {
    if (frLoading[i]) {
      return 'Loading...';
    }
	}

  return (
    <MatchFrContext.Provider value={frContext}>{props.children}</MatchFrContext.Provider>
  );
};
