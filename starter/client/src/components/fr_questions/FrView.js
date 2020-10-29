import React from "react";

export default function FrView({frObj}) {
	const {fr_answer, fr_question} = frObj

	// really all you need to do is add styling to this component
  return (
		<div className="pro-body__con">
				<h3 className="pro-body__head">{fr_question}</h3>
				<p className="pro-body__cont">{fr_answer}</p>
		</div>
  );
}
