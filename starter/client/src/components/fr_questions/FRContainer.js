  import React, { useContext, useState } from "react";

import { UserFrContext } from "../../context/user_fr_context";
import FRForm from "./FRForm";

export default function FRContainer() {
  // const [allFr, loading] = useContext(FRContext)
	const userFrContext = useContext(UserFrContext);
  // console.log(allFr, loading)
  const {userAnsweredFr, userUnansweredFr} = userFrContext
  return (
    <>
      {userAnsweredFr.map((frObj, idx) => (
        <FRForm key={idx} frObj={frObj} />
      ))}
      {userUnansweredFr.map((frObj, idx) => (
        <FRForm key={idx} frObj={frObj} />
      ))}
    </>
  );
}
