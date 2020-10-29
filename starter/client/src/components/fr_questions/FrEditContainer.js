import React, { useContext } from "react";

import { FrContext } from "../../context/fr_context";
import FrEdit from "./FrEdit";

export default function FrEditContainer({ show }) {
  const frContext = useContext(FrContext);

  const { userAnsweredFr, userUnansweredFr } = frContext;

  const frArr = [...userAnsweredFr, ...userUnansweredFr];
  return (
    <>
      {frArr.map((frObj, idx) => (
        <FrEdit key={idx} frObj={frObj} />
      ))}
    </>
  );
}
