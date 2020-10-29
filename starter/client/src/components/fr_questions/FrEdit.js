import React, { useState, useContext } from "react";
import AuthContext from "../../auth";
import { TextareaAutosize } from "@material-ui/core";
import "./FrEdit.css";

export default function FrUserForm({ frObj }) {
  let { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);

  const { fr_answer, fr_question, fr_question_id, fr_alt } = frObj;

  const [response, setResponse] = useState(fr_answer || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/api/questions/fr/${user_id}/answer`;
    const body = JSON.stringify({
      question_id: fr_question_id,
      response,
    });
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    fetchWithCSRF(url, options);
  };

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pro-body__con">
        <h3 className="pro-body__head">{fr_question}</h3>
        <p className={response ? "pro-body__cont" : "pro-body__alt-cont"}>
          <TextareaAutosize
						className='textarea'
            aria-label="minimum height"
            rowsMin={2}
            placeholder={fr_alt}
            value={response}
            onChange={handleChange}
          />
          {/* <textarea
						// type="textarea"
						// need to style textarea field
						style={{}}
            placeholder={fr_alt}
            value={response}
            onChange={handleChange}
          /> */}
        </p>
        <button>Write</button>
      </div>
    </form>
  );
}
{
  /* <div className="pro-body__con">
  <h3 className="pro-body__head">{question.question}</h3>
  <p className="pro-body__cont">{question.answer}</p>
</div>;

<div className="pro-body__con">
  <h3 className="pro-body__head">{question.question}</h3>
  <p className="pro-body__alt-cont">{question.alt}</p>
</div>; */
}
