import React, { useContext } from "react";

import { FrContext } from "../../context/fr_context";
import FrUserForm from "./FrUserForm";
import FrMatchView from "./FrMatchView";

export default function FrContainer({ view }) {
  const frContext = useContext(FrContext);

  const { userAnsweredFr, userUnansweredFr, matchAnsweredFr } = frContext;

  if (view === "user") {
    const frArr = [...userAnsweredFr, ...userUnansweredFr];
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrUserForm key={idx} frObj={frObj} />
        ))}
      </>
    );
  } else {
    const frArr = [...matchAnsweredFr];
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrMatchView key={idx} frObj={frObj} />
        ))}
      </>
    );
  }
}
