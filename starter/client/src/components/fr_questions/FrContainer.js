import React, { useContext, useState } from "react";

import { FrContext } from "../../context/fr_context";
import FrEdit from "./FrEdit";
import FrView from "./FrView";


export default function FrContainer({edit, updatedFr, setUpdatedFr}) {
  const frContext = useContext(FrContext);
  console.log('in frContainer', updatedFr)
  console.log('in frContainer', )

  const { userAnsweredFr, userUnansweredFr, matchAnsweredFr } = frContext;

  if (edit) {
    let frArr = [...userAnsweredFr, ...userUnansweredFr]
    return (
      <>
      {frArr.map((frObj, idx) => (
        <FrEdit key={frObj.fr_question_id} frObj={frObj} setUpdatedFr={setUpdatedFr} updatedFr={updatedFr}/>
      ))}
    </>
    )
  } else {
    let frArr = [...userAnsweredFr]
    return (
      <>
      {frArr.map((frObj, idx) => (
        <FrView key={idx} frObj={frObj} />
      ))}
    </>
    )
  }
}
