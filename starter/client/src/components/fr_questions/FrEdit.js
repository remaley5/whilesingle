import React, { useState, useContext } from "react";
import AuthContext from "../../auth";
import { TextareaAutosize } from "@material-ui/core";
import "./FrEdit.css";
import Button from "@material-ui/core/Button";

export default function FrEdit({ frObj, key, setUpdatedFr, updatedFr }) {
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);

  let { fr_answer, fr_question, fr_question_id, fr_alt} = frObj;

  if (!fr_answer) {
    fr_answer = ''
    console.log(key, updatedFr)
  }
  // const [response, setResponse] = useState(fr_answer || "");



  const handleChange = (e) => {
    // setUpdatedFr(updatedFr[key] = e.target.value)
    // setResponse(e.target.value);
  };

  return (
    <div className="pro-body__con">
      <h3 className="pro-body__head">{fr_question}</h3>
      <p className={fr_answer ? "pro-body__cont" : "pro-body__alt-cont"}>
        <TextareaAutosize
          style={{ "white-space": "pre" }}
          className="textarea"
          aria-label="minimum height"
          rowsMin={2}
          placeholder={fr_alt}
          value={fr_answer}
          onChange={handleChange}
        />
      </p>
      <Button >Write</Button>
    </div>
  );
}
