import React, { useContext, useState } from "react";

import { FRContext } from "../../context/fr_context_all";
import FRFormContainer from "./FRFormContainer";

export default function FRContainer() {
  // const [allFr, loading] = useContext(FRContext)
	const frContext = useContext(FRContext);
  // console.log(allFr, loading)
  const {userAnsweredFr, userUnansweredFr} = frContext
  return (
    <>
      {userAnsweredFr.map((frObj, idx) => (
        <FRFormContainer key={idx} frObj={frObj} />
      ))}
      {userUnansweredFr.map((frObj, idx) => (
        <FRFormContainer key={idx} frObj={frObj} />
      ))}
    </>
  );
}
