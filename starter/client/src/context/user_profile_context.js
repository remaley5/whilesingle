import React, { useState, createContext, useEffect, useContext } from "react";
import AuthContext from "../auth";

export const UserProfileContext = createContext();

export const UserProfileContextProvider = (props) => {
  let { currentUserId } = useContext(AuthContext);
	const user_id = parseInt(currentUserId, 10)

	// we'll also need a match id to load their answered questions only
  // const match_id = 2;

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
  const useFetch = (url, id = null) => {
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

	const [userProfile, userProfileLoading] = useFetch(`/api/users/${user_id}`, user_id);

	if (userProfileLoading) {
		return "Loading...";
	}
  return (
    <UserProfileContext.Provider value={userProfile}>
      {props.children}
    </UserProfileContext.Provider>
  );
};
