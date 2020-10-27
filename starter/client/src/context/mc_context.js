import React, { useState, createContext, useEffect } from "react";

export const McContext = createContext();

export const McContextProvider = (props) => {
  // need to get user Id from context or something.
  // hard code for now
  const user_id = 3;

  // we'll also need a match id to load their answered questions only
  const match_id = 2;

  const useFetch = (url, id=null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(url);
        console.log(res)
        const json = await res.json();
				// call returns object with one key - we only want its value (an array)
				console.log(json)
				if (json) {
					// console.log(json)
					const obj = json[Object.keys(json)];
					setData(obj);
					// console.log(obj)
				}
        setLoading(false);
      }
      fetchData();
    }, [id]);
    return [data, loading];
  };

  const [allMc, allMcLoading] = useFetch("/api/questions/mc/all");
  const [userAnsweredMc, userAnsweredMcLoading] = useFetch(
    `/api/questions/mc/answered/${user_id}`, user_id
  );
  const [userUnansweredMc, userUnansweredMcLoading] = useFetch(
    `/api/questions/mc/unanswered/${user_id}`, user_id
  );
  // const allFr = useFetch("/api/questions/fr/all")
  // setAllFr(data);
  const [matchAnsweredMc, matchAnsweredMcLoading] = useFetch(
    `/api/questions/mc/answered/${match_id}`, match_id
  );

// 		console.log(allMc)
  const mc = {
    allMc,
    userAnsweredMc,
    userUnansweredMc,
    matchAnsweredMc,
  };


  const mcLoading = [
    allMcLoading,
    userAnsweredMcLoading,
    userUnansweredMcLoading,
    matchAnsweredMcLoading,
	];
	// console.log(mcLoading)
	// make sure context loaded before rendering children
  for (let i = 0; i < mcLoading.length; i++) {
    if (mcLoading[i]) {
      return 'Loading...';
    }
	}

  return (
    <McContext.Provider value={mc}>{props.children}</McContext.Provider>
  );
};
