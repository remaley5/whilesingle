import React from "react";

export default function McView({mcObj}) {
	const {mc_answer, mc_question} = mcObj

  return (
    <>
      <div>{mc_question}</div>
      <div>{mc_answer}</div>
    </>
  );
}
