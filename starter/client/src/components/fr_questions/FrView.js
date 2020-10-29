import React from "react";

export default function FrView({frObj}) {
	const {fr_answer, fr_question} = frObj

	// really all you need to do is add styling to this component
  return (
    <>
      <div>{fr_question}</div>
      <div>{fr_answer}</div>
    </>
  );
}
