import React from "react";

export default function McMatchView({mcObj}) {
	const {mc_answer, mc_question, mc_question_id} = mcObj

  console.log("MC_QUESTION_ID", mc_question_id);

  return (
    <>
      <div>{mc_question}</div>
      <div>{mc_answer}</div>
    </>
  );
}
