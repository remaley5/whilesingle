import React, { useContext } from "react";

import { FrContext } from "../../context/fr_context";
import FrUserForm from "./FrUserForm";
import FrMatchView from "./FrMatchView";

export default function FrContainer({ view }) {
  const frContext = useContext(FrContext);

  const { userAnsweredFr, userUnansweredFr, matchAnsweredFr } = frContext;

	// if user view - that means they want to edit their own responses
	// render form
  if (view === "user") {
    const frArr = [...userAnsweredFr, ...userUnansweredFr];
    return (
      <>
        {frArr.map((frObj, idx) => (
          <FrUserForm key={idx} frObj={frObj} />
        ))}
      </>
		);
		// if not user view - that means they want to view a match's profile
		// or they want to view their own profile as their matches see it
		// render view
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
