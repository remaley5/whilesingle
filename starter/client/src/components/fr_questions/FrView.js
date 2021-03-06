import React from "react";

export default function FrView({ frObj }) {
  const { fr_answer, fr_question, fr_alt } = frObj;
  return (
    <div className="pro-body__con">
      <h3 className="pro-body__head">{fr_question}</h3>
      {(fr_answer || fr_answer === ' ') ? (
        <p className="pro-body__cont">{fr_answer}</p>
      ) : (
        <p className="pro-body__cont-alt">{fr_alt}</p>
      )}
    </div>
  );
}
