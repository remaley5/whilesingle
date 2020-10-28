import React from "react";

export default function FrMatchView({frObj}) {
	const {fr_answer, fr_question, fr_question_id} = frObj

  console.log("FR_QUESTION_ID", fr_question_id);

  return (
    <>
      <div>{fr_question}</div>
      <div>{fr_answer}</div>
    </>
  );
}
