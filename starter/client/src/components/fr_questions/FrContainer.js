import React, { useContext } from "react";

import { FrContext } from "../../context/fr_context";
import FrEdit from "./FrEdit";
import FrView from "./FrView";


export default function FrContainer({edit, updatedFr, setUpdatedFr}) {
  const frContext = useContext(FrContext);

  console.log('from FrContainer', updatedFr)
  const view_match = false

  const { userAnsweredFr, userUnansweredFr, matchAnsweredFr } = frContext;

  // if user editing their own answers
  if (edit) {
    const frArr = [...userAnsweredFr, ...userUnansweredFr]
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrEdit key={idx} frObj={frObj} setUpdatedFr={setUpdatedFr} updatedFr={updatedFr}/>
        ))}
      </>
    )
    // if user viewing their profile or a match's
  } else {
    const frArr = view_match ? [...matchAnsweredFr] : [...userAnsweredFr]
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrView key={idx} frObj={frObj} />
        ))}
      </>
    )
  }
}