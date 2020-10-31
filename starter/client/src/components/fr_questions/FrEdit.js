import React, { useState } from "react";
import { TextareaAutosize } from "@material-ui/core";
import "./FrEdit.css";

export default function FrEdit({ frObj, setUpdatedFr, updatedFr }) {
  let { fr_answer, fr_question, fr_alt, fr_question_id} = frObj;
  fr_question_id = parseInt(fr_question_id,10)
  if (!fr_answer) {
    fr_answer = ''
  }
  const [response, setResponse] = useState(fr_answer || "");

  const handleChange = (e) => {
    setResponse(e.target.value);
    const newUpdatedFr = {...updatedFr}
    newUpdatedFr[fr_question_id] = e.target.value
    setUpdatedFr(newUpdatedFr)
  }
  return (
    <div className="pro-body__con">
      <h3 className="pro-body__head">{fr_question}</h3>
      <p className={response ? "pro-body__cont" : "pro-body__alt-cont"}>
        <TextareaAutosize
          style={{ "whiteSpace": "pre" }}
          className="textarea"
          aria-label="minimum height"
          rowsMin={2}
          placeholder={fr_alt}
          value={response}
          onChange={handleChange}
        />
      </p>
    </div>
  );
}
