import React, { useContext } from "react";

import { FrContext } from "../../context/fr_context";
import FRForm from "./FRForm";

export default function FrContainer({view}) {

	const frContext = useContext(FrContext);

	const { userAnsweredFr, userUnansweredFr, matchAnsweredFr } = frContext;

	const frArr = view === 'user' ? [...userAnsweredFr, ...userUnansweredFr] : [...matchAnsweredFr]
	// will return free response questions for user or match based on value of view prop
  return (
    <>
      {frArr.map((frObj, idx) => (
        <FRForm key={idx} frObj={frObj} />
      ))}
    </>
  );
}
