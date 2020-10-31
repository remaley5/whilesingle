import React from "react";

export default function FrView({ frObj }) {
  const { fr_answer, fr_question, fr_alt } = frObj;
	// console.log(fr_question, fr_answer)
	// really all you need to do is add styling to this component
	// fix this!!!!
	// console.log(fr_answer === null)
  return (
    <div className="pro-body__con">
      <h3 className="pro-body__head">{fr_question}</h3>
      {(fr_answer || fr_answer === ' ') ? (
        <p style={{'white-space': 'pre-wrap'}}className="pro-body__cont">{fr_answer}</p>
      ) : (
        <p className="pro-body__cont-alt">{fr_alt}</p>
      )}
    </div>
  );
}
