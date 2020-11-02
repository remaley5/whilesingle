import React, {useState, useEffect} from "react";
import FrView from "./FrView";

export default function FrMatchContainer({ otherUserId }) {
  const [loading, setLoading] = useState(true);

  const useFetch = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      // console.log('hits use effect')
      async function fetchData() {
        const res = await fetch(`/api/questions/fr/answered/${otherUserId}`);
        const json = await res.json();
        // call returns object with one key - we only want its value (an array)
        const data = json[Object.keys(json)];
        setData(data);
        setLoading(false);
      }
      fetchData();
    }, [otherUserId]);
    return data;
  };

  const frArr = useFetch();

  if (loading) {
    return "waiting...";
  }

  return (
    <>
      {frArr.map((frObj, idx) => (
        <FrView key={idx} frObj={frObj} />
      ))}
    </>
  );
}
