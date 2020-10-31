import React, { useState, useContext } from "react";
import AuthContext from "../../auth";
import { TextareaAutosize } from "@material-ui/core";
import "./FrEdit.css";
import Button from "@material-ui/core/Button";

export default function FrUserForm({ frObj }) {
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);

  const { fr_answer, fr_question, fr_question_id, fr_alt } = frObj;

  const [response, setResponse] = useState(fr_answer || "");

  const handleClick = (e) => {
    e.preventDefault();
    let url = `/api/questions/fr/${user_id}/answer`;
    let body = { question_id: fr_question_id, response };

    if (fr_question_id === "bio") {
      url = `/api/users/${user_id}`;
      body = { bio: response };
    }

    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetchWithCSRF(url, options);
  };

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  return (
    <div className="pro-body__con">
      <h3 className="pro-body__head">{fr_question}</h3>
      <p className={response ? "pro-body__cont" : "pro-body__alt-cont"}>
        <TextareaAutosize
          style={{ "white-space": "pre" }}
          className="textarea"
          aria-label="minimum height"
          rowsMin={2}
          placeholder={fr_alt}
          value={response}
          onChange={handleChange}
        />
      </p>
      <Button onClick={handleClick}>Write</Button>
    </div>
  );
}
