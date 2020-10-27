import React, { useState, createContext, useEffect } from "react";

export const FRContext = createContext();

export const FRContextProvider = (props) => {
  // const [allFr, setAllFr] = useState(null);

	const useFetch = (url) => {
		const [data, setData] = useState(null);
		const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(url);
				const json = await res.json();
				console.log(json)
        // setData(all_fr_questions);
        setLoading(false);
      }
      fetchData();
    }, [url]);
    return [data, loading];
	};

	const [allFr, allFrLoading] = useFetch("/api/questions/fr/all")
	const [answeredFr, answeredFrLoading] = useFetch('/api/questions/fr/responses')
	// const allFr = useFetch("/api/questions/fr/all")
  // setAllFr(data);

  return (
    <FRContext.Provider value={[allFr, allFrLoading]}>
      {props.children}
    </FRContext.Provider>
  );
};
