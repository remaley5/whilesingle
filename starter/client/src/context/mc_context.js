import React, { useState, createContext, useEffect, useContext } from "react";
import AuthContext from "../auth";

export const McContext = createContext();

export const McContextProvider = (props) => {
  // need to get user Id from context or something.
	// hard code for now
  const { currentUserId: user_id } = useContext(AuthContext);


  // we'll also need a match id to load their answered questions only
  const match_id = 2;

  const useFetch = (url, id=null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(url);
        const json = await res.json();
				// call returns object with one key - we only want its value (an array)
        const obj = json[Object.keys(json)];
        setData(obj);
        setLoading(false);
      }
      fetchData();
    }, [id, url]);
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
      return 'where is it?';
    }
	}

	return (
    <McContext.Provider value={mc}>{props.children}</McContext.Provider>
    );
  };
