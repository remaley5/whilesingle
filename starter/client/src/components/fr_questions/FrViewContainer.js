import React, { useContext } from "react";

import { FrContext } from "../../context/fr_context";
import FrView from "./FrView";

export default function FrViewContainer() {
  const frContext = useContext(FrContext);

  // if profile you're viewing is yourself, load userAnsweredFr
  // if viewing a match, load matchAnsweredFr
  //	for now we hardcode userAnswered
  const { userAnsweredFr, userUnansweredFr, matchAnsweredFr } = frContext;

  const frArr = [...userAnsweredFr];
  return (
    <>
      {frArr.map((frObj, idx) => (
        <FrView key={idx} frObj={frObj} />
      ))}
    </>
  );
}
